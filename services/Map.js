import Api from "~/services/Api"

export default {
    getResellers() {
        return Api().get("/resellersData.json")
    },
    getPolyDepartment() {
        return Api().get("/polyDepartment.json")
    }
}
