const { execCommand, getPackagesFolder } = require("./util/index.js")

const command = "git.exe"
const args = ["clone"]
const repositories = ["dmail/shared-config"]

repositories
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
