import axios from 'axios'

async function fetch({ url, body = {}, method = 'post' }) {
	return new Promise((resolve) => {
		axios({
			url,
			method,
			headers: { 'content-type': 'application/json; ' },
			data: body,
			timeout: 15000,
		}).then((res) => {
			resolve({ ...res })
		}).catch((err) => {
			resolve({ code: 500, data: {}, msg: err.toString() })
		})
	})
}

const utils = {
	// 请求
	fetch,
}

export default utils
