// a chokidar to auto rerun this when any directory gets added/removed from packages/* ??

const { createCommand, exposeModuleCommand } = require("../command")
const { getPackagesFolder } = require("./util/index.js")

const createSymlinkCommand = () =>
	createCommand({
		command: "symlink",
		args: [".", "--execute"],
		cwd: getPackagesFolder()
	})
exposeModuleCommand(module, createSymlinkCommand)
