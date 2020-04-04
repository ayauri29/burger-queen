
const state = {
	cart: []
}

// getters
const getters = {
	getCart(state) {
		return state.cart
	}
}

// actions
const actions = {
	SET_CART({ commit }, newCart) {
		commit('setCart', newCart)
	},
	// fetchHotel({state, commit, rootState}, y) {
	// 	return axios.post(`https://apirenti.com/v1/api/users/${rootState.auth.user.id}/hotels`).then(response => {
	// 		console.log('axios vuex', response)
	// 		// commit('setToken', response.data)
	// 	})
	// }
}

// mutations
const mutations = {
	setCart(state, newCart) {
    console.log(state, 'state')
    console.log(newCart, 'new cart')
    const verify = state.cart.some(el => el.nombre === newCart.nombre);
    if (verify) {
      const index = state.cart.findIndex(
        el => el.nombre === newCart.nombre
      );
      state.cart[index]["cantidad"] =
        parseInt(state.cart[index]["cantidad"]) + 1;
    } else {
      newCart.cantidad = 1;
      state.cart.push(newCart)
    }
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
