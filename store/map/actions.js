import Map from "~/services/Map"

export default {
    async getResellersByDep({ commit }, department) {
        const resp = await Map.getResellers()
        const filter = resp.data.filter(x => x.zone_action.includes(department))

        commit("GET_RESELLERS", filter)
    }
}
