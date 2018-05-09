import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Resource from 'vue-resource'

import { vuex, routers } from './config'

import './scss/global'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(Resource)

// 实例化
const router = new Router(routers),
	store = new Vuex.Store(vuex)

function afterEach(transition) {
	if (transition.meta.title) {
		document.title = transition.meta.title
	}
}

function beforeEach(to, from, next) {
	next()
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)

new Vue({
	router,
	store,
}).$mount('#app')
