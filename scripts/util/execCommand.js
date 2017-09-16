const { spawn } = require("child_process")

const isWindows = process.platform === "win32"
const defaultArgs = []

const execCommand = ({
	command,
	args = defaultArgs,
	cwd = process.cwd(),
	onData = () => {},
	onError = () => {}
}) => {
	if (isWindows) {
		if (command.endsWith(".exe") === false) {
			command += ".cmd"
		}
	}
	return new Promise((resolve, reject) => {
		const commandProcess = spawn(command, args, {
			cwd
		})
		commandProcess.stdout.on("data", data => onData(data.toString()))
		commandProcess.stderr.on("data", data => onError(data.toString()))
		commandProcess.on("error", error => reject(error))
		commandProcess.on("close", status => {
			if (status === 0) {
				resolve(`${command} ${args.join(" ")} exited with ${status}`)
			} else {
				reject(new Error(`${command} ${args.join(" ")} exited with ${status}`))
			}
		})
	})
}
exports.execCommand = execCommand
