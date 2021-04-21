<template>
    <div />
</template>

<script>
import mapboxgl from "mapbox-gl"
import { mapGetters } from "vuex"

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
        }
    },
    data: () => ({}),
    computed: {
        ...mapGetters({
            modal: "socials/getData"
        })
    },
    watch: {
        clickCoordinates() {
            this.deleteAllMarkers()
            this.addMarkers()
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // console.log("coordonnées : ", this.map, this.clickCoordinates);
        },

        addMarkers() {
            this.addClickMarker("#F3DB2F", this.clickCoordinates)
        },
        addClickMarker(colorMarker, position) {
            const marker = new mapboxgl.Marker({ color: colorMarker })
            marker.setLngLat(position)
            marker.addTo(this.map)
        },

        deleteAllMarkers() {
            document.querySelectorAll(".mapboxgl-marker").forEach(e => e.remove())
        }
    }
}
</script>

<style>
</style>
