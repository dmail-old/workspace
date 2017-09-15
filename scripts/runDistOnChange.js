const path = require("path")
const chokidar = require("chokidar")

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

watcher.on("addDir", location => {
	location = location.replace(/\\/g, "/")
	const parentDirectory = path.dirname(location)
	if (parentDirectory === rootDirectory) {
		// si y'a un package.json alors faudrais run npm run dist
		// si le dossier dist n'existe pas
		console.log(`dir discovered ${location}`)
	}
})
watcher.on("add", location => {
	location = location.replace(/\\/g, "/")
	console.log(`file discovered ${location}`)
})
watcher.on("change", (location, stats) => {
	location = location.replace(/\\/g, "/")
	// si le fichier modifié est dans un dossier ayant un package.json
	// alors npm run dist dans ce dossier
	console.log(`File ${location} has been changed, stats ${stats}`)
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
