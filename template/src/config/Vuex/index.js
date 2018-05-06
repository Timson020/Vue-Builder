import state from './Store'
import mutations from './Mutations'
import getters from './Getters'
import actions from './Actions'
import createPersistedState from 'vuex-persistedstate'

const setHandle = (key, state) => sessionStorage.setItem(key, JSON.stringify(state))

const getHandle = (key) => {
	if (!sessionStorage[key]) { return {} }
	return JSON.parse(sessionStorage[key])
}

export default {
	state,
	mutations,
	getters,
	actions,
	plugins: [createPersistedState({
		storage: sessionStorage,
		getState: getHandle,
		setState: setHandle,
	})]
}