// dev
const host = 'http://www.baidu.com:9090/'

// release
// const host = '/'

const projectName = 'project/api/'

const userInfix = 'user/'
const commonInfix = 'common/'

const services = {
	signin: `${host}${projectName}${commonInfix}signIn`,
	signup: `${host}${projectName}${commonInfix}signUp`,
	getuserinfo: `${host}${projectName}${userInfix}getuserinfo`,
}

export default services
