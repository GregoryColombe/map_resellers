import { getResellers } from "~/services/Map"

export default {
    async getResellersByDep({ commit }, department) {
        let object = null

        if(department) {
            const resp      = await getResellers()
            const proximity = resp.data.filter(x => x.zone_action.includes(department))
            const agree     = resp.data.filter(x => x.cp_user.slice(0, 2) === department.toString())

            object = {proximity, agree}
        }

        commit("GET_RESELLERS", object)
    },
}
