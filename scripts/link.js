// a chokidar to auto rerun this when any directory gets added/removed from packages/* ??

const { createCommand, exposeModuleCommand } = require("@dmail/command")
const { getPackagesFolder } = require("./util/index.js")

const createSymlinkCommand = () =>
	createCommand({
		name: "../node_modules/.bin/symlink",
		args: [".", "--execute"],
		cwd: getPackagesFolder()
	})
exposeModuleCommand(module, createSymlinkCommand)
