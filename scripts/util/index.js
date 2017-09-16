const path = require("path")
const { spawn } = require("child_process")

const isWindows = process.platform === "win32"
// http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
if (isWindows) {
	const rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	})
	const forceEmit = () => {
		rl.removeListener("SIGINT", forceEmit)
		process.emit("SIGINT")
	}
}

const createBeforeExitHandler = () => {
	const callbacks = []
	const emit = () => {
		callbacks.forEach(callback => callback())
	}
	const listener = () => {
		emit()
		process.exit()
	}
	const listen = () => {
		process.on("SIGINT", listener)
	}
	const stopListening = () => {
		process.removeListener("SIGINT", listener)
	}
	const add = callback => {
		if (callbacks.length === 0) {
			listen()
		}
		callbacks.push(callback)
		const remove = () => {
			const index = callbacks.indexOf(callback)
			if (index > -1) {
				callbacks.splice(index, 1)
				if (callbacks.length === 0) {
					stopListening()
				}
			}
		}
		return remove
	}
	return add
}
const beforeExit = createBeforeExitHandler()

const defaultArgs = []

const execCommand = ({
	command,
	args = defaultArgs,
	gracefulExit = true,
	cwd = process.cwd(),
	onData = () => {},
	onError = () => {}
}) => {
	if (isWindows) {
		if (command.endsWith(".exe") === false) {
			command += ".cmd"
		}
	}
	return new Promise((resolve, reject) => {
		const commandProcess = spawn(command, args, {
			cwd
		})
		commandProcess.stdout.on("data", data => onData(data.toString()))
		commandProcess.stderr.on("data", data => onError(data.toString()))
		commandProcess.on("error", error => reject(error))
		commandProcess.on("close", status => {
			if (status === 0) {
				resolve(`${command} ${args.join(" ")} exited with ${status}`)
			} else {
				reject(new Error(`${command} ${args.join(" ")} exited with ${status}`))
			}
		})
		if (gracefulExit) {
			beforeExit(() => commandProcess.kill())
		}
	})
}
exports.execCommand = execCommand

const getPackagesFolder = () => path.resolve(__dirname, "../../../packages")
exports.getPackagesFolder = getPackagesFolder

const attempt = (fn, catchWhen = () => false) => {
	let value
	try {
		value = fn()
	} catch (e) {
		if (catchWhen(e)) {
			return { value, catched: true, exception: e }
		}
		throw e
	}
	return { value, catched: false }
}
exports.attempt = attempt
