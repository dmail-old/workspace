/*

// il manque plusieurs chose, tout dabord la possibilité
// de créer une commande qui n'en soit pas vraiment une mais se comporte comme tel
// pour "faire genre" et qu'elle puisse être utilisé pas execSequence
// une sorte de fromPromise qui permettrais à setupFolder d'être combiné aux autres
// ensuite ben si je fais execSequence je veux pouvoir tout de même éxécuter
// les commandes retournée par createGitCloneCommands en parallel
// donc enchainé en sequence mais certaine étape se font en série en étant wrap
// enfin pouvoir contrôller l'éxécution des commande suivante en fonction de la réponse des précédente?
// lorsque setupfolder retourne zéro mais en disant hey j'ai abort parce que le folder
// existe alors j'aimerais pouvoir dire a bah dans ce cas c'est une erreur
// en gros il faut une api par dessus en mode programmation fonctionnelle....
// comme les seuls scripts importants marchent déjà (symlink et watch)
// ca sera pour un autre jour... ou jamais xD
// .then(value => (value.startsWith("aborted") ? Promise.reject(value) : value))

*/

// const path = require("path")
const treeKill = require("tree-kill")
const { spawn } = require("child_process")
const { whenWillTerminate, whenTerminate } = require("./whenProcess.js")
const { createAbreviator } = require("./abbreviate.js")

const abbreviate = createAbreviator(10)
const isWindows = process.platform === "win32"
const defaultArgs = []

const defaultOnMessage = text => process.stdout.write(text)
const defaultOnAlarm = text => process.stderr.write(text)

const createCommand = ({ name, label, args = defaultArgs, cwd = process.cwd() }) => {
	if (isWindows) {
		if (name.endsWith(".exe") === false) {
			name += ".cmd"
		}
	}

	const toString = () => `${name} ${args.join(" ")}`

	const fork = ({
		onMessage = defaultOnMessage,
		onAlarm = defaultOnAlarm,
		onError = defaultOnAlarm,
		onExit = status => defaultOnMessage(`exited with ${status}`)
	}) => {
		let alive = false
		const execution = {}
		const isAlive = () => alive
		const kill = signal => (isAlive() ? treeKill(execution.process.pid, signal) : undefined)

		setImmediate(() => {
			try {
				const commandProcess = spawn(name, args, { cwd })
				onMessage(toString() + "\n") // eslint-disable-line prefer-template
				execution.process = commandProcess
				alive = true
				commandProcess.stdout.on("data", data => {
					onMessage(data.toString())
				})
				commandProcess.stderr.on("data", data => {
					onAlarm(data.toString())
				})
				commandProcess.on("error", error => {
					onError(error)
				})
				commandProcess.on("close", status => {
					alive = false
					onExit(status)
				})
				whenWillTerminate(() => {
					kill("SIGINT")
				})
				whenTerminate(() => {
					kill("SIGTERM")
				})
			} catch (error) {
				onError(error)
			}
		})

		Object.assign(execution, { isAlive, kill })

		return execution
	}

	return {
		name,
		label,
		args,
		toString,
		fork
	}
}

const addLine = text => text + "\n" // eslint-disable-line prefer-template
const prefix = (command, text, noline) => {
	let commandIdentifier
	if ("label" in command && command.label) {
		commandIdentifier = command.label
	} else {
		commandIdentifier = command.name
	}

	const prefixString = abbreviate(commandIdentifier)
	const prefixed = `${prefixString}: ${text}`
	return noline ? prefixed : addLine(prefixed)
}
const createAlarmFromError = (command, error) =>
	prefix(
		command,
		`Error while executing:
${error.stack}`
	)
const createMessageFromSuccess = (command, status) => prefix(command, `exited with ${status}`)
const createAlarmFromFailure = (command, status) => prefix(command, `exited with ${status}`)

exports.createCommand = createCommand

const exec = (command, { onMessage = defaultOnMessage, onAlarm = defaultOnAlarm } = {}) =>
	new Promise((resolve, reject) => {
		command.fork({
			onMessage: text => onMessage(prefix(command, text, true)),
			onAlarm: text => onMessage(prefix(command, text, true)),
			onError: error => onAlarm(createAlarmFromError(error)),
			onExit: status => {
				if (status === 0) {
					onMessage(createMessageFromSuccess(command, status))
					resolve()
				} else {
					onAlarm(createAlarmFromFailure(command, status))
					reject()
				}
			}
		})
	})
exports.exec = exec

const execSequence = (commands, { onMessage = defaultOnMessage, onAlarm = defaultOnAlarm } = {}) =>
	commands.reduce(
		(previous, command, index) =>
			previous.then(() => {
				if (index > 0) {
					onMessage("\n")
				}
				return exec(command, { onMessage, onAlarm })
			}),
		Promise.resolve()
	)
exports.execSequence = execSequence

/*
execute all commands in parallel and fails if any fails (killing remaining)
or pass if all pass
*/
const execAll = (commands, { onMessage = defaultOnMessage, onAlarm = defaultOnAlarm } = {}) =>
	new Promise((resolve, reject) => {
		const handleError = (error, command) => onAlarm(createAlarmFromError(error, command))

		const executions = []
		const killOthers = (command, index) => {
			onMessage("sending SIGTERM to other processes..")
			executions.forEach(({ kill }, executionIndex) => {
				if (executionIndex !== index) {
					kill("SIGTERM")
				}
			})
		}
		const commandStatus = []
		const handleExit = (status, command, index) => {
			commandStatus[index] = status
			if (status === 0) {
				onMessage(createMessageFromSuccess(status, command, index))
				if (commandStatus.length === commands.length) {
					resolve()
				}
			} else {
				onAlarm(createAlarmFromFailure(status, command, index))
				killOthers(command, index)
				reject()
			}
		}

		commands.forEach((command, index) => {
			const execution = command.fork({
				onMessage: text => onMessage(text),
				onAlarm: text => onAlarm(text),
				onError: error => handleError(error, command, index),
				onExit: status => handleExit(status, command, index)
			})
			executions.push(execution)
		})
	})
exports.execAll = execAll

// we could add execAny, execRace etc...

const exposeModuleCommand = (module, commandFactory, runCommand = exec) => {
	if (!module.parent) {
		Promise.resolve()
			.then(commandFactory)
			.then(runCommand)
			.then(() => process.exit(0), () => process.exit(1))
	}
	module.exports = commandFactory
}
exports.exposeModuleCommand = exposeModuleCommand
