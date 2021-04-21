export default {
    setData({ commit }, payload) {
        commit("SET_DATA", payload)
    },
    setModal({ commit }, payload) {
        commit("SET_MODAL", payload)
    }
}
