function number(num = '', max, min = 1) {
	if (new RegExp(`^\\d{${min},${max}}$`).test(num)) return true
	return false
}

function phone(phone = '') {
	if (/^[1][358][0-9]{9}$/ig.test(phone)) return true
	return false
}

export default {
	number,
	phone,
}
