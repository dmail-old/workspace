const { promiseSequence } = require("./util/promise-utils.js")
const { findFilesForTest } = require("./util/find-files.js")

const runTest = file => {
	console.log(`loading ${file}`)
	const defaultExport = require(file) // eslint-disable-line import/no-dynamic-require
	console.log(`executing ${file}`)
	return defaultExport()
}

// we are running tests in sequence and not in parellel because they are likely going to fail
// when they fail we want the failure to be reproductible, if they run in parallel we introduce
// race condition, non determinism, etc: bad idea
const runTests = (location = process.cwd()) =>
	findFilesForTest(location).then(files => promiseSequence(files, runTest))
module.exports = runTests
