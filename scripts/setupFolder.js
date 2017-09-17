const fs = require("fs")
const path = require("path")
const ncp = require("ncp").ncp
const { getPackagesFolder } = require("./util/index.js")
const { exposeModuleCommand } = require("../command")

const setupFolder = () => {
	return new Promise((resolve, reject) => {
		const packagesLocation = getPackagesFolder()
		console.log(`creating ${packagesLocation}`)

		fs.mkdir(packagesLocation, error => {
			if (error) {
				if (error.code === "EEXIST") {
					return resolve(`aborted: ${packagesLocation} already exists`)
				}
				return reject(error)
			}

			const source = path.resolve(__dirname, "../packages")
			const destination = packagesLocation
			const options = { clobber: true, stopOnErr: true }

			console.log(`copy ${source} content into ${destination}`)
			ncp(source, destination, options, error => {
				if (error) {
					return reject(error)
				}
				return resolve("done")
			})
		})
	})
}
exposeModuleCommand(module, setupFolder, setupFolderPromise => setupFolderPromise)
