// init a package inside the current folder, the folder must be empty else we throw

const { exposeModuleCommand } = require("../command")
const path = require("path")
const fs = require("fs")
const ncp = require("ncp").ncp

const templateDirectory = path.join(__dirname, "../template")

const directoryIsEmpty = directory =>
	new Promise((resolve, reject) => {
		fs.readdir(directory, (error, files) => {
			if (error) {
				return reject(error)
			}
			return resolve(files.length === 0)
		})
	})
const copyTemplateIntoDirectory = directory =>
	new Promise((resolve, reject) => {
		const options = { clobber: true, stopOnErr: true }
		console.log(`copy ${source} content into ${destination}`)
		ncp(templateDirectory, directory, options, error => {
			if (error) {
				return reject(error)
			}
			return resolve("done")
		})
	})

const init = (directory = process.cwd()) =>
	directoryIsEmpty(directory).then(isEmpty => {
		if (isEmpty === false) {
			throw new Error("directory must be empty")
		}
		return copyTemplateIntoDirectory(directory)
	})
exposeModuleCommand(module, init, initPromise => initPromise)
