const { execCommand, getPackagesPath } = require("./util/index.js")

execCommand({
	command: "symlink",
	args: [".", "--execute"],
	cwd: getPackagesPath(),
	onData: console.log,
	onError: console.error
}).catch(console.error)
