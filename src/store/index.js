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
        // Push new item to array
        state.cartItems.push(payload.item)
      } else if(payload.type === 'remove' && payload.item) {
        // get index of object with item id
        const removeIndex = state.cartItems.map(item => item.id).indexOf(payload.item.id)

        // remove item
        state.cartItems.splice(removeIndex, 1)
      }
    }
  },
  actions: {
    handleCartItems: ({ commit }, payload) => {
      commit('handleCartItems', payload)
    }
  }
})