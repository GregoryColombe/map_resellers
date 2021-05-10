<template>
    <div />
</template>

<script>

export default {
    name: "MapMarker",
    props: {
        map: {
            type: Object,
            default: () => ({})
        },
        clickCoordinates: {
            type: Array,
            default: () => ([])
        }, 
        color: {
            type: String,
            default: "#1b65c5"
        },
        resellers: {
            type: Array,
            default: () => ([])
        }
    },
    data: () => ({
        coordinates: ""
    }),
    
    watch: {
        clickCoordinates() {
            this.deleteAllMarkers()
            this.addMarkers()
        },
        resellers() {
            this.deleteAllMarkers()
            this.addMarkers()
        }
    },
    mounted() {
        this.init()
        this.getLocalisation()
    },
    methods: {
        init() {
        },

        addMarkers() {
            console.log("ok my meen");
            this.addClickMarker("#F3DB2F", this.clickCoordinates)
            this.addResellersMarker("#FF0000")
        },
        addClickMarker(colorMarker, position) {
            const marker = new this.$mapboxgl.Marker({ color: colorMarker })
            marker.setLngLat(position)
            marker.addTo(this.map)
        },

        addLocalisationMarker() {
            console.log("localisation");
        },

        addResellersMarker(colorMarker) {
            this.resellers.forEach(reseller => {
                new Promise((resolve) => {
                    resolve(
                        this.getCoordinates(reseller)
                    )
                }).then(() => {
                    const marker = new this.$mapboxgl.Marker({ color: colorMarker })
                    marker.setLngLat(this.coordinates)
                    marker.addTo(this.map)
                })
            });
        },
        
        async getCoordinates(reseller) {
            let adress = reseller[1].adresse1_user + " "+ reseller[1].cp_user
            adress = this.changeAdressFormat(adress, " ", "+")
            this.coordinates = await this.$axios.$get("https://api-adresse.data.gouv.fr/search/?q=" + adress)
            this.coordinates = this.coordinates.features[0].geometry.coordinates
            console.log("Coordinates : ", this.coordinates);
        },

        changeAdressFormat(adress, oldString, newString) {
            return adress.replace(
                new RegExp(oldString, "g"),
                newString
            )
        },
        deleteAllMarkers() {
            document.querySelectorAll(".mapboxgl-marker").forEach(e => e.remove())
        },
        
    }
}
</script>

<style>
</style>
