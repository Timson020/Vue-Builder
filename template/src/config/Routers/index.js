import { Home } from '@/routes'

const routes = [{
	path: '/',
	name: 'Home',
	meta: {
		title: '首页',
	},
	component: Home,
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
	base: '/',
}
