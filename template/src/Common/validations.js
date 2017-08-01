function number(value = '', max, min = 1) {
	if (new RegExp(`^\\d{${min},${max}}$`)) return true
	return false
}

function phone(phone) {
	if (/^[1][358][0-9]{9}$/ig.test(value)) return true
	return false
}

export default {
	number,
	phone,
}