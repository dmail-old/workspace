const fs = require("fs")
const path = require("path")
const { getPackagesFolder } = require("./util/index.js")
const { exposeModuleCommand } = require("../command")
const init = require('./init.js')

const create = (name) => {
  const packagesDirectory = getPackagesFolder()
  const createdPackageDirectory = path.join(packagesDirectory, name)

  return new Promise((resolve, reject) => {
    fs.mkdir(createdPackageDirectory, error => {
      if (error) {
        if (error.code === "EEXIST") {
          return resolve(`aborted: ${packagesLocation} already exists`)
        }
        return reject(error)
      }
      return resolve()
    })
  }).then(
    () => init(createdPackageDirectory)
  )
}
exposeModuleCommand(module, create, createPackagePromise => createPackagePromise)

