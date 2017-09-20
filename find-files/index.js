const path = require("path")
const fs = require("fs")
const { promisifyNodeCallback, promisify } = require("./promise-utils.js")

const getDirectoryContent = promisifyNodeCallback(fs.readdir)
const getStat = promisifyNodeCallback(fs.stat)

const createFileFinder = ({ file = () => true, folder = () => true }) => (
	relativeRoot = process.cwd()
) => {
	file = promisify(file)
	folder = promisify(folder)
	const root = path.resolve(__dirname, relativeRoot)
	const files = []
	const visit = location =>
		getStat(location).then(stat => {
			if (stat.isDirectory()) {
				return folder({
					location,
					root,
					stat
				}).then(include => {
					if (include) {
						return getDirectoryContent(location)
							.then(filenames =>
								Promise.all(
									filenames
										.map(filename => path.join(location, filename))
										.map(location => visit(location))
								)
							)
							.then(() => files)
					}
					return files
				})
			}
			return file({
				location,
				root,
				stat
			}).then(include => {
				if (include) {
					files.push(location)
				}
				return files
			})
		})

	return visit(root)
}
exports.createFileFinder = createFileFinder

const isTestFile = location => /\.test\..+$/.test(location)
const isRootFile = (location, root) => path.dirname(location) === root

const isRootFolder = (location, root) => location === root
const isSourceFolder = (location, root) => location.startsWith(path.join(root, "src"))
const isIndexFile = (location, root) =>
	isRootFile(location, root) && path.basename(location) === "index.js"
const isIndexTestFile = (location, root) => isRootFile(location, root) && isTestFile(location)
const isSourceFile = (location, root) => location.startsWith(path.join(root, "src"))
const isSourceTestFile = (location, root) => isSourceFile(location, root) && isTestFile(location)

// source & test files are prettified
const findFilesForPrettier = createFileFinder({
	folder: ({ location, root }) => isRootFolder(location, root) || isSourceFolder(location, root),
	file: ({ location, root }) =>
		isIndexFile(location, root) || isIndexTestFile(location, root) || isSourceFile(location, root)
})
exports.findFilesForPrettier = findFilesForPrettier

// test files are tested
const findFilesForTest = createFileFinder({
	folder: ({ location, root }) => isRootFolder(location, root) || isSourceFolder(location, root),
	file: ({ location, root }) => isIndexTestFile(location, root) || isSourceTestFile(location, root)
})
exports.findFilesForTest = findFilesForTest
