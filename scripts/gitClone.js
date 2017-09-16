const { execCommand, getPackagesFolder } = require("./util/index.js")

const gitClone = () => {
	const command = "git.exe"
	const args = ["clone"]
	const repositories = [
		"dmail/sample-common-dependency",
		"dmail/sample-main",
		"dmail/sample-dependency",
		"dmail/shared-config"
	]

	return repositories
		.reduce((previous, repository) => {
			return previous.then(() =>
				execCommand({
					command,
					args: [...args, `git@github.com:${repository}.git`],
					cwd: getPackagesFolder(),
					onData: console.log,
					onError: console.error
				}).then(console.log)
			)
		}, Promise.resolve())
		.catch(console.error)
}
if (require.main === module) {
	gitClone()
}

module.exports = gitClone
