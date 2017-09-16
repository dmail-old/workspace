const setupFolder = require("./setupFolder.js")
const gitClone = require("./gitClone.js")
const symlink = require("./symlink.js")

const setup = () =>
	Promise.resolve()
		.then(setupFolder)
		.then(value => (value.startsWith("aborted") ? Promise.reject(value) : value))
		.then(gitClone)
		.then(symlink)

if (require.main === module) {
	setup()
}
module.exports = setup
