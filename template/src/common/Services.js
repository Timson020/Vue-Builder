const services = {}

// dev
const host = 'http://www.baidu.com:9090/'

// release
// const host = '/'

const userInfix = 'user/'
const commonInfix = 'common/'

services.signin = `${host}${commonInfix}signIn`
services.signup = `${host}${commonInfix}signUp`
services.getuserinfo = `${host}${userInfix}getuserinfo`

export default services
