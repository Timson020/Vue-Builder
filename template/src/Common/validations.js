function number(value = '') {
	if (/^\d+(\.\d+)?$/ig.test(value)) return true
	return false
}

export default {
	number
}