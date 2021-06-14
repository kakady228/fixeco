import { createStore } from 'vuex'

export default createStore({
  state: {
    currentModels: Object,
    userData: Object,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.userData = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    USER: state=> {
      return state.userData;
    },
  }
})