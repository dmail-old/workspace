const { createCommand, execCommand } = require("../command")
const { getPackagesFolder } = require("./util/index.js")

const symlink = () =>
	execCommand(
		createCommand({
			command: "symlink",
			args: [".", "--execute"],
			cwd: getPackagesFolder()
		})
	).then(() => process.exit(0), () => process.exit(1))

if (require.main === module) {
	symlink()
}

module.exports = symlink
