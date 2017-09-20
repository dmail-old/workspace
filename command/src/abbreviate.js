const MIN_CHAR_AROUND_ABBREVIATION = 1
const createAbbreviator = (maxTotalLength, abbreviation = "..") => {
	const abbreviationLength = abbreviation.length
	const maxAbbreviationLength = maxTotalLength - MIN_CHAR_AROUND_ABBREVIATION * 2
	if (abbreviationLength > maxAbbreviationLength) {
		throw new Error(`${abbreviationLength} must be < ${maxAbbreviationLength}`)
	}

	const abbreviate = text => {
		const length = text.length
		if (length <= maxTotalLength) {
			return text
		}

		const maxLength = maxTotalLength - abbreviation.length
		const maxEndLength = Math.floor(maxLength / 2)
		const maxStartLength = maxLength - maxEndLength

		const truncatedStart = text.slice(0, maxStartLength)
		const truncatedEnd = text.slice(-maxEndLength)

		return truncatedStart + abbreviation + truncatedEnd
	}
	return abbreviate
}
exports.createAbbreviator = createAbbreviator
