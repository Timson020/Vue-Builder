const utils = {
	// 版本
	version: 'v1.0.0',
	// 主题颜色
	themeColor: '#ed604f',
	// 请求
	ajax
}

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

export default utils