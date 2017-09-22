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

// instead of ./index.js below we should read it from package.json module field
const relativeEntryFile = "./index.js"

const isTestFile = location => /\.test\..+$/.test(location)

const isRootFolder = (location, root) => location === root
const isSourceFolder = (location, root) => location.startsWith(path.join(root, "src"))
const isEntryFile = (location, root) => path.resolve(root, relativeEntryFile) === location
const isEntryTestFile = (location, root) => {
	const entryFile = path.resolve(root, relativeEntryFile)
	const entryFolder = path.dirname(entryFile)
	const folder = path.dirname(location)
	if (entryFolder !== folder) {
		return false
	}
	return isTestFile(path.basename(location))
}
const isSourceFile = (location, root) => location.startsWith(path.join(root, "src"))
const isSourceTestFile = (location, root) => isSourceFile(location, root) && isTestFile(location)

const taggers = [
	{
		name: "code",
		when: (location, root) =>
			isRootFolder(location, root) ||
			isSourceFolder(location, root) ||
			isSourceFile(location, root) ||
			isEntryFile(location, root)
	},
	{
		name: "test",
		when: (location, root) => isSourceTestFile(location, root) || isEntryTestFile(location, root)
	}
]

const getFileTags = (...args) =>
	taggers.filter(tagger => tagger.when(...args)).map(tagger => tagger.name)

const matchAnyTags = (...tags) => ({ location, root }) =>
	getFileTags(location, root).some(tag => tags.includes(tag))

// code & test files are prettified
const findFilesForPrettier = createFileFinder({
	folder: matchAnyTags("code"),
	file: matchAnyTags("code", "test")
})

exports.findFilesForPrettier = findFilesForPrettier

// test files are tested
const findFilesForTest = createFileFinder({
	folder: matchAnyTags("code"),
	file: matchAnyTags("test")
})
exports.findFilesForTest = findFilesForTest
