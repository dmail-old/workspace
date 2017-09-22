const { createCommand, exposeModuleCommand, execAll } = require("@dmail/command")
const { getPackagesFolder } = require("./util/index.js")

const defaultRepositories = [
	"dmail/sample-common-dependency",
	"dmail/sample-main",
	"dmail/sample-dependency",
	"dmail/shared-config"
]
const createGitCloneCommands = ({ repositories = defaultRepositories } = {}) => {
	const command = "git.exe"
	const args = ["clone"]
	const commands = repositories.map(repository =>
		createCommand({
			command,
			args: [...args, `git@github.com:${repository}.git`],
			cwd: getPackagesFolder()
		})
	)
	return commands
}
exposeModuleCommand(module, createGitCloneCommands, execAll)
