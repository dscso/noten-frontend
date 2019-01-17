import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
      navbar: false
  },
  mutations: {
      toggle_navbar (state) {
        state.navbar = !state.navbar;
      }
  },
  actions: {

  },
  getters: {
      navbar(state) {
          return state.navbar;
      }
  }
})
