const { createCommand, exposeModuleCommand, execSequence } = require("../command")

const defaultExtensions = [
	"christian-kohler.path-intellisense",
	"dbaeumer.vscode-eslint",
	"esbenp.prettier-vscode"
]
const createInstallCodeExtensionCommands = ({ extensions = defaultExtensions } = {}) => {
	return extensions.map(extension =>
		createCommand({
			name: "code",
			label: `install ${extension}`,
			args: ["--install-extension", extension]
		})
	)
}
exposeModuleCommand(module, createInstallCodeExtensionCommands, execSequence)
