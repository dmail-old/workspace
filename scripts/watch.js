// a chokidar to auto watch any added directory into packages/* ??

const path = require("path")
const fs = require("fs")
const { createCommand, exposeModuleCommand, execAll } = require("@dmail/command")
const { attempt, getPackagesFolder } = require("./util/index.js")

const readDirectory = location =>
	new Promise((resolve, reject) => {
		fs.readdir(location, (error, files) => {
			if (error) {
				return reject(error)
			}
			resolve(files)
		})
	})

const getPackageData = location => {
	const { value: buffer, catched } = attempt(
		() => fs.readFileSync(path.join(location, "package.json")),
		exception => exception && exception.code === "ENOENT"
	)
	if (catched) {
		return false
	}
	return JSON.parse(buffer.toString())
}

const createNpmScriptRunner = ({ scriptName }) => {
	const getScript = data => {
		if ("scripts" in data === false) {
			return ""
		}
		const scripts = data.scripts
		if (scriptName in scripts === false) {
			return ""
		}
		return scripts[scriptName]
	}

	const getScriptFromPackage = location => {
		const data = getPackageData(location)
		if (data) {
			return getScript(data)
		}
		return ""
	}

	const createNpmScriptCommands = () => {
		const rootDirectory = getPackagesFolder().replace(/\\/g, "/")

		return readDirectory(rootDirectory)
			.then(files => files.map(file => path.join(rootDirectory, file)))
			.then(folders => {
				const commands = []
				folders.forEach(folder => {
					const script = getScriptFromPackage(folder)
					if (script) {
						commands.push(
							createCommand({
								command: "npm",
								args: ["run", scriptName],
								cwd: location
							})
						)
					}
				})
				return commands
			})
	}

	return createNpmScriptCommands
}

const runNpmWatchScripts = createNpmScriptRunner({
	name: "watch"
})

exposeModuleCommand(module, runNpmWatchScripts, execAll)
