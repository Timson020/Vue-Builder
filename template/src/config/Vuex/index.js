import state from './Store'
import mutations from './Mutations'
import getters from './Getters'
import actions from './Actions'
import createPersistedState from 'vuex-persistedstate'

const setHandle = (key, state) => localStorage.setItem(key, JSON.stringify(state))

const getHandle = (key) => {
	if (!localStorage[key]) { return {} }
	return JSON.parse(localStorage[key])
}

export default {
	state,
	mutations,
	getters,
	actions,
	plugins: [createPersistedState({
		storage: localStorage,
		getState: getHandle,
		setState: setHandle,
	})]
}