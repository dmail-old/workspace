const { execCommand, getPackagesFolder } = require("./util/index.js")

execCommand({
	command: "symlink",
	args: [".", "--execute"],
	cwd: getPackagesFolder(),
	onData: console.log,
	onError: console.error
}).catch(console.error)
