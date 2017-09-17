const { createCommand, execSequence } = require("../command")

const installCodeExtensions = () => {
	const name = "code"
	const args = ["--install-extension"]
	const extensions = [
		"christian-kohler.path-intellisense",
		"dbaeumer.vscode-eslint",
		"esbenp.prettier-vscode"
	]
	const commands = extensions.map(extension =>
		createCommand({
			name,
			label: `install ${extension}`,
			args: [...args, extension]
		})
	)
	return execSequence(commands)
}
if (require.main === module) {
	installCodeExtensions().then(() => process.exit(0), () => process.exit(1))
}
module.exports = installCodeExtensions
