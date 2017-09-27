// a chokidar to auto rerun this when any directory gets added/removed from packages/* ??

const path = require("path")
const { createCommand, exposeModuleCommand } = require("@dmail/command")
const { getPackagesFolder } = require("./util/index.js")

const createSymlinkCommand = () =>
	createCommand({
		name: path.resolve(__dirname, "../node_modules/.bin/symlink"),
		windowsExtension: "cmd",
		args: [".", "--execute"],
		cwd: getPackagesFolder()
	})
exposeModuleCommand(module, createSymlinkCommand)
