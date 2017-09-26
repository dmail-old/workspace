// https://github.com/kimmobrunfeldt/concurrently/blob/master/src/main.js

const path = require("path")

const getPackagesFolder = () => path.resolve(__dirname, "../../packages")
exports.getPackagesFolder = getPackagesFolder

const attempt = (fn, catchWhen = () => false) => {
	let value
	try {
		value = fn()
	} catch (e) {
		if (catchWhen(e)) {
			return { value, catched: true, exception: e }
		}
		throw e
	}
	return { value, catched: false }
}
exports.attempt = attempt
