const services = {}

// dev
const host = 'http://www.baidu.com'
// release
// const host = '/'
const port = ''

const userInfix = 'user/'
const commonInfix = 'common/'

services = {
	signIn: `${host}${port}/${commonInfix}signIn`,
	signUp: `${host}${port}/${commonInfix}signUp`,
}

export default services
