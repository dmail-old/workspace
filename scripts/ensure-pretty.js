const prettier = require("prettier")
const fs = require("fs")
const { findFilesForPrettier } = require("./util/find-files.js")
const { promisifyNodeCallback, promiseParallel } = require("./util/promise-utils.js")

const getFileContent = promisifyNodeCallback(fs.readFile)

const ensureFileIsPretty = file => {
	console.log(`ensure pretty ${file}`)
	return Promise.all([
		getFileContent(file),
		prettier.resolveConfig(file)
	]).then(([source, options]) => {
		const isPretty = prettier.check(source, { ...options, filepath: file })
		if (isPretty) {
			console.log(`${file} is pretty`)
		} else {
			throw new Error(`${file} is ugly (does not respect prettier config`)
		}
	})
}

const ensureFolderIsPretty = (location = process.cwd()) =>
	findFilesForPrettier(location).then(files => promiseParallel(files, ensureFileIsPretty))
module.exports = ensureFolderIsPretty
