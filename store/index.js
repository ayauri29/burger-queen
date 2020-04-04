import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import modules from './modules';
import cart from './modules/cart';

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const createStore = () =>  new Vuex.Store({
	namespaced: false,
	modules:{
		cart
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})

export default createStore;
