import axios from "axios"

export const getResellers = function() {
    return axios.get(process.env.BASE_URL + "/resellersData.json")
}
export const getPolygonsDepartments = function() {
    return axios.get(process.env.BASE_URL + "/polyDepartment.json")
}
export const getCoordinatesByAddress = function(address, cp) {
    return axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${cp}`)
}
