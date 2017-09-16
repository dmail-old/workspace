const { execCommand } = require("./util/index.js")

const command = "code"
const args = ["--install-extension"]
const extensions = [
	"christian-kohler.path-intellisense",
	"dbaeumer.vscode-eslint",
	"esbenp.prettier-vscode"
]

extensions
	.reduce((previous, extension) => {
		return previous.then(() =>
			execCommand({
				command,
				args: [...args, extension],
				onData: console.log,
				onError: console.error
			}).then(console.log)
		)
	}, Promise.resolve())
	.catch(console.error)
