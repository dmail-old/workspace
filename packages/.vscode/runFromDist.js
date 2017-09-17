// inspired from https://gist.github.com/dchowitz/83bdd807b5fa016775f98065b381ca4e

const path = require("path")
const childProcess = require("child_process")

const file = process.argv[2]

if (!file) {
	process.stderr.write("filename missing")
	process.exit(1)
}

const resolvedFile = path.resolve(file)
const cwd = process.cwd()
const fileRelativeToCwd = path.relative(cwd, resolvedFile)
const packageDirectoryName = fileRelativeToCwd.split(path.sep)[0]
const fileRelativePackageDirectory = fileRelativeToCwd.slice(packageDirectoryName.length)
const packageDirectory = path.join(cwd, packageDirectoryName)

// ensure dist is fresh
// (we could manually ensure dist is fresh, or disable it with an option)
// for now always recompile before executing (seems logic)
childProcess.spawnSync("npm", ["run", "compile"], { cwd: packageDirectory })

const distFile = path.join(packageDirectory, "dist", fileRelativePackageDirectory)

require(distFile)
