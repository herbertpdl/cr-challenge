import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: [],
  },
  getters: {
    cartItems: state => {
      return state.cartItems
    }
  },
  mutations: {
    handleCartItems: (state, payload) => {
      if (payload.type === 'add' && payload.item) {
        state.cartItems.push(payload.item)
      }
    }
  },
  actions: {
    handleCartItems: ({ commit }, payload) => {
      commit('handleCartItems', payload)
    }
  }
})