const path = require("path")
const { execCommand } = require("./util/execCommand.js")

const command = "git.exe"
const args = ["clone"]
const repositories = ["dmail/shared-config"]

repositories
	.reduce((previous, repository) => {
		return previous.then(() =>
			execCommand({
				command,
				args: [...args, `git@github.com:${repository}.git`],
				cwd: path.resolve(__dirname, "../packages"),
				onData: console.log,
				onError: console.error
			}).then(console.log)
		)
	}, Promise.resolve())
	.catch(console.error)
