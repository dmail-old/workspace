const { createCommand, execSequence } = require("../command")
const { getPackagesFolder } = require("./util/index.js")

const gitClone = () => {
	const command = "git.exe"
	const args = ["clone"]
	const repositories = [
		"dmail/sample-common-dependency",
		"dmail/sample-main",
		"dmail/sample-dependency",
		"dmail/shared-config"
	]

	const commands = repositories.map(repository =>
		createCommand({
			command,
			args: [...args, `git@github.com:${repository}.git`],
			cwd: getPackagesFolder()
		})
	)

	return execSequence(commands, {
		onData: console.log,
		onError: console.error
	}).then(() => process.exit(0), () => process.exit(1))
}
if (require.main === module) {
	gitClone()
}

module.exports = gitClone
