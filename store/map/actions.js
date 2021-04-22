import Map from "~/services/Map"

export default {
    async getResellersByDep({ commit }, department) {
        const resp      = await Map.getResellers()
        const proximite = resp.data.filter(x => x.zone_action.includes(department))
        const agreer    = resp.data.filter(x => x.cp_user.slice(0, 2) === department.toString())

        commit("GET_RESELLERS", {proximite, agreer})
    }
}
