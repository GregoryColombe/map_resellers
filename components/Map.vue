<template>
    <div>
        <div id="map" />
        <Resellers
            :finding-resellers="findingResellers"
            :poly-department="polyDepartment"
            :poly-selected="polySelected"
        />
        <MapMarker
            :map="map"
            :click-coordinates="clickCoordinates"
            color="#1b65c5"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "mapbox-gl/dist/mapbox-gl.css"

export default {
    name: "Map",
    data: () => ({
        map: {},
        polyDepartment: {},
        customData: "",
        clickCoordinates: [],
        findingResellers: false,
        polySelected: {},
    }),
    computed: {
        ...mapGetters({
            polyDepartments: "map/getPolyDepartments"
        })
    },

    methods: {
        ...mapActions({
            getPolyDepartments: "map/getPolyDepartments"
        }),

        init() {
            this.$mapboxgl.accessToken = this.$config.mapboxToken
            this.map = new this.$mapboxgl.Map({
                container: "map",
                style: this.$config.mapboxStyle,
                center: [2.3334804999999506, 46.8770224],
                zoom: 5.2,
                minZoom: 3.75
            })
        },
        config() {
            this.map.dragPan.enable()
            this.map.dragRotate.disable()
            this.map.doubleClickZoom.disable()
        },

        setPolyDepartments() {
            this.map.on("load", () => {
                // Add polygones
                this.map.addLayer(this.polyDepartments)

                // Add Number of departments
                this.map.addLayer({
                    id: "text-departement",
                    type: "symbol",
                    source: "departement-delimitation",
                    layout: {
                        "text-field": "{code}",
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Bold"
                        ],
                        "text-size": 14
                    },
                    paint: {
                        "text-color": "#fff"
                    }
                })

                // Add Lines of Polygones
                this.map.addLayer({
                    id: "line-departement",
                    type: "line",
                    source: "departement-delimitation",
                    layout: {},
                    paint: {
                        "line-color": "#4fa9dd",
                        "line-width": 0.5
                    }
                })
            })
        },
        onPolygoneClick() {
            this.map.on("click", e => {
                const clickCoordinates       = [e.lngLat.lng, e.lngLat.lat]
                const polyDepartmentSelected = this.polyDepartments.source.data.features
                const checkPointInPoly       = polyDepartmentSelected.some(x => this.$turf.booleanPointInPolygon(clickCoordinates, x))

                checkPointInPoly && this.map.flyTo({ center: clickCoordinates, zoom: 6.2 })
            })
        }
    },
    mounted() {
        this.init()
        this.config()

        this.getPolyDepartments()
        this.setPolyDepartments()

        this.onPolygoneClick()
    }
}
</script>

<style lang="scss" scoped>
#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
</style>
