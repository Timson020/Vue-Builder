// import the main library
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

// import the global scss or css
import './Sass/global.scss';

// import the config about vuex and vue-router
import routes from './Config/Router';
import vuex from './Config/Vuex';

// 加载进去Vue
Vue.use(Vuex);
Vue.use(VueRouter);

// 实例化
let router = new VueRouter(routes);
let store = new Vuex.Store(vuex);

let App = new Vue({
	router,
	store
}).$mount('#app');