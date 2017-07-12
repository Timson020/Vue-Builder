import { Home, SignIn, SignUp } from '@/Routes'

const routes = [{
	path: '/',
	name: 'Home',
	meta: {
		title: '首页'
	},
	component: Home,
}, {
	path: '/signIn',
	name: 'SignIn',
	meta: {
		title: '注册'
	},
	component: SignIn,
}, {
	path: '/signUp',
	name: 'SignUp',
	meta: {
		title: '登录'
	},
	component: SignUp,
}]

function scrollBehavior(to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	} else {
		return { x: 0, y: 0 }
	}
}

export default {
	routes,
	mode: 'history',
	scrollBehavior,
	base: '/'
}
