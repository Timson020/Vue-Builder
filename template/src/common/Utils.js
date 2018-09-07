async function ajax(url, body = {}, method = 'post') {
	let _res
	try {
		_res = await this.$http({
			method: method,
			url: url,
			body: body,
			emulateJSON: true
		})
	} catch (err) {
		return { code: 400, data: null, msg: err }
	}
	return { code: 200, data: _res, msg: '' }
}

const utils = {
	// 请求
	ajax,
}

export default utils
