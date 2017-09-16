const path = require("path")
const fs = require("fs")
const { attempt, execCommand, getPackagesFolder } = require("./util/index.js")

const scriptName = "watch"

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
const runNpmCommand = location => {
	const command = "npm"
	const args = ["run", scriptName]
	return execCommand({
		command,
		args,
		cwd: location,
		onData: console.log,
		onError: console.error
	}).then(console.log, console.error)
}
const readDirectory = location =>
	new Promise((resolve, reject) => {
		fs.readdir(location, (error, files) => {
			if (error) {
				return reject(error)
			}
			resolve(files)
		})
	})

const execNpmScript = () => {
	const rootDirectory = getPackagesFolder().replace(/\\/g, "/")

	return readDirectory(rootDirectory)
		.then(files => files.map(file => path.join(rootDirectory, file)))
		.then(folders => {
			folders.forEach(folder => {
				const script = getScriptFromPackage(folder)
				if (script) {
					runNpmCommand(folder)
				}
			})
		})
}

if (require.main === module) {
	execNpmScript()
}
module.exports = execNpmScript()
