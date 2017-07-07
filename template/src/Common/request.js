const request = {}

const host = 'http://www.baidu.com/'

async function ajax(url, body, method = 'post') {
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
};

request.api = {
	signIn: host + 'signIn',
	signUp: host + 'signUp',
}

request.ajax = ajax

module.exports = request