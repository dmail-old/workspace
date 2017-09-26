const { createCommand, exposeModuleCommand, execAll } = require("@dmail/command")
const { getPackagesFolder } = require("./util/index.js")

const defaultRepositories = [
	"dmail/sample-common-dependency",
	"dmail/sample-main",
	"dmail/sample-dependency"
]
const createGitCloneCommands = ({ repositories = defaultRepositories } = {}) => {
	const name = "git"
	const args = ["clone"]
	const commands = repositories.map(repository =>
		createCommand({
			name,
			windowsExtension: "exe",
			args: [
				...args,
				`git@github.com:${repository}.git`
				// no need to pass a folder name, git clone is smart and create an appropriate folder name ;)
				// `./${path.basename(repository)}`,
			],
			cwd: getPackagesFolder()
		})
	)
	return commands
}
exposeModuleCommand(module, createGitCloneCommands, execAll)
