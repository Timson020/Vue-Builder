const services = {}

// dev
const host = 'http://www.baidu.com/'
// release
// const host = '/'

const userInfix = 'user/'
const commonInfix = 'common/'

services.api = {
	signIn: `${host}${commonInfix}signIn`,
	signUp: `${host}${commonInfix}signUp`,
}

export default services
