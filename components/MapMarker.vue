<template>
    <div></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import {mapGetters} from 'vuex';

export default {
    name: 'MapMarker',
    props: {
        map: Object,
        clickCoordinates: Array,
        color: String,
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            modal: 'socials/getData'
        })
    },
    methods: {
        init: function() {
            console.log("coordonnées : ", this.map, this.clickCoordinates);
        },

        addMarkers: function() {
            this.addClickMarker("#F3DB2F", this.clickCoordinates)
        },
        addClickMarker: function(colorMarker, position) {
            const marker = new mapboxgl.Marker({ color: colorMarker })
            marker.setLngLat(position)
            marker.addTo(this.map)
        },

        deleteAllMarkers: function() {
            document.querySelectorAll(".mapboxgl-marker").forEach((e) => e.remove())
        }
    },
    mounted(){
        this.init()
    },

    watch: {
        clickCoordinates: function () {
            this.deleteAllMarkers()
            this.addMarkers()
        }
    }
}
</script>

<style>

</style>
