const path = require("path")
const chokidar = require("chokidar")
const fs = require("fs")
const { findNearestPackageJsonSync } = require("find-nearest-package-json")
const { execCommand } = require("./util/execCommand.js")

const rootDirectory = path.resolve(__dirname, "../packages").replace(/\\/g, "/")
const watcher = chokidar.watch(rootDirectory, {
	ignored: [
		location => {
			location = location.replace(/\\/g, "/")
			if (location === rootDirectory) {
				return false
			}
			const parentDirectory = path.dirname(location)
			// dossier direct de rootDirectory
			if (parentDirectory === rootDirectory) {
				return false
			}
			const relativeLocation = location.slice(rootDirectory.length + 1)
			const parts = relativeLocation.split("/")
			const secondPart = parts[1]
			// rootDirectory/*/index.js
			if (secondPart === "index.js") {
				return false
			}
			// rootDirectory/*/src/*
			if (secondPart === "src") {
				return false
			}
			return true
		}
	],
	persistent: true
})
const getPackageData = location => {
	let buffer
	try {
		buffer = fs.readFileSync(path.join(location, "package.json"))
	} catch (e) {
		if (e && e.code === "ENOENT") {
			return false
		}
		throw e
	}
	return JSON.parse(buffer.toString())
}
const scriptName = "dist"
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
const getDistInfo = location => {
	let distStat
	try {
		distStat = fs.statSync(path.join(location, "./dist"))
	} catch (e) {
		if (e && e.code === "ENOENT") {
			return {
				exists: false
			}
		}
		throw e
	}

	return {
		exists: true,
		isDirectory: distStat.isDirectory()
	}
}
const runScript = location => {
	const command = "npm"
	const args = ["run", "dist"]
	execCommand({
		command,
		args,
		cwd: location,
		onData: console.log,
		onError: console.error
	}).then(console.log, console.error)
}
const runScriptAfterDirectoryDiscovered = location => {
	const script = getScriptFromPackage(location)
	if (script) {
		const { exists, isDirectory } = getDistInfo(location)
		if (exists && isDirectory === false) {
			console.warn("found a file named dist")
			return
		} else if (exists === false) {
			runScript(location)
		}
	}
}
const runScriptAfterFileChange = (location, data) => {
	const script = getScript(data)
	if (script) {
		runScript(location)
	}
}

watcher.on("addDir", location => {
	location = location.replace(/\\/g, "/")
	const parentDirectory = path.dirname(location)
	if (parentDirectory === rootDirectory) {
		runScriptAfterDirectoryDiscovered(location)
	}
})
watcher.on("add", location => {
	location = location.replace(/\\/g, "/")
	console.log(`file discovered ${location}`)
})
watcher.on("change", location => {
	location = location.replace(/\\/g, "/")
	let packageInfo
	try {
		packageInfo = findNearestPackageJsonSync(location)
	} catch (e) {
		if (e && e.message === "No package.json files found") {
			return
		}
		throw e
	}
	const { path: packagePath, data } = packageInfo
	const parent = path.dirname(packagePath)
	runScriptAfterFileChange(parent, data)
	// console.log(`File ${location} has been changed, stats ${stats}`)
})

const isWindows = process.platform === "win32"
if (isWindows) {
	// http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
	const rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	})
	const forceEmit = () => {
		rl.removeListener("SIGINT", forceEmit)
		process.emit("SIGINT")
	}
}
process.on("SIGINT", () => {
	watcher.close()
	process.exit()
})
