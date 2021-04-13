export default {
  setData: function({ commit }, payload) {
    commit('SET_DATA', payload)
  },
  setModal: function({ commit }, payload) {
    commit('SET_MODAL', payload)
  }
}
