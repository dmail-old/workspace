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
const relativeFileParts = fileRelativeToCwd.split(path.sep)

// only index.js, index.test.js and src/* can be runned from dist
// we don't really have to check this because the require() will fail saying
// the file cannot be found
// even if the error will happen late (after npm run compile)
// I prefer this so that this script doesn't have to know which file
// can be runned and which cannot
// const onlyFileNames = ["index.js", "index.test.js"]
// const onlyFolderNames = ["src"]
// if (relativeFileParts.length === 3) {
// 	const filename = relativeFileParts[2]
// 	if (onlyFileNames.indexOf(filename) === -1) {
// 		process.stderr.write(`only ${onlyFileNames} can be runned from dist`)
// 		process.exit(1)
// 	}
// }
// const fileParentFolder = relativeFileParts[1]
// if (onlyFolderNames.indexOf(fileParentFolder) === -1) {
// 	process.stderr.write(`only ${onlyFolderNames} can be runned from dist`)
// 	process.exit(1)
// }

const packageDirectoryName = relativeFileParts[0]
const packageDirectory = path.join(cwd, packageDirectoryName)
// ensure dist is fresh
// (we could manually ensure dist is fresh, or disable it with an option)
// for now always recompile before executing (seems logic)
childProcess.spawnSync("npm", ["run", "compile"], { cwd: packageDirectory })

// locate the file to execute it
const fileRelativeToPackageDirectory = fileRelativeToCwd.slice(packageDirectoryName.length)
const distFile = path.join(packageDirectory, "dist", fileRelativeToPackageDirectory)

// execute using require (this way process.args like --inspect are fowarded)
require(distFile)
