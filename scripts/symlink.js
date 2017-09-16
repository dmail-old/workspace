const { execCommand, getPackagesFolder } = require("./util/index.js")

const symlink = () =>
	execCommand({
		command: "symlink",
		args: [".", "--execute"],
		cwd: getPackagesFolder(),
		onData: console.log,
		onError: console.error
	}).catch(console.error)

if (require.main === module) {
	symlink()
}

module.exports = symlink
