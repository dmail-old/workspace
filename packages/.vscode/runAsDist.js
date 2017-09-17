// on pourrait vouloir s'assurer que ce fichier est bien compilé avant de le run
// pour cela il faudrais npm run compile

// inspired from https://gist.github.com/dchowitz/83bdd807b5fa016775f98065b381ca4e

const path = require("path")

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
const distFile = path.join(cwd, packageDirectoryName, "dist", fileRelativePackageDirectory)

require(distFile)
