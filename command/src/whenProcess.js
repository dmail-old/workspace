const createProcessSignalHandler = ({ name, afterEmit = () => {}, onListened = () => {} }) => {
	const callbacks = []
	const emit = () => {
		callbacks.forEach(callback => callback())
	}
	let listenedCleanup
	let listenerCleanup
	const listen = () => {
		listenedCleanup = onListened()

		const listener = () => {
			emit()
			afterEmit()
		}
		process.on(name, listener)
		listenerCleanup = () => {
			process.removeListener(name, listener)
		}
	}
	const stopListening = () => {
		if (listenerCleanup) {
			listenerCleanup()
			listenerCleanup = undefined
		}
		if (listenedCleanup) {
			listenedCleanup()
			listenedCleanup = undefined
		}
	}
	const add = callback => {
		if (callbacks.length === 0) {
			listen()
		}
		callbacks.push(callback)
		const remove = () => {
			const index = callbacks.indexOf(callback)
			if (index > -1) {
				callbacks.splice(index, 1)
				if (callbacks.length === 0) {
					stopListening()
				}
			}
		}
		return remove
	}
	return add
}

const isWindows = process.platform === "win32"
const whenWillTerminate = createProcessSignalHandler({
	name: "SIGINT",
	onListened: () => {
		// http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
		if (isWindows) {
			const rl = require("readline").createInterface({
				input: process.stdin,
				output: process.stdout
			})
			const forceEmit = () => {
				rl.removeListener("SIGINT", forceEmit)
				process.emit("SIGINT")
			}
			return () => rl.close()
		}
	},
	afterEmit: () => process.exit()
})
exports.whenWillTerminate = whenWillTerminate

const whenTerminate = createProcessSignalHandler({
	name: "SIGTERM"
})
exports.whenTerminate = whenTerminate
