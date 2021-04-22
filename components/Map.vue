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
        resellers: []
    }),
    mounted() {
        this.initMap()
        this.configMap(this.map)
        this.getPolyDepartment()
        this.detectIfClickIsInside(this.map)
    },

    methods: {
        async getPolyDepartment() {
            this.polyDepartment = await this.$axios.$get("/polyDepartment.json")
            this.loadPoly(this.map, this.polyDepartment)
        },

        initMap() {
            this.$mapboxgl.accessToken = this.$config.mapboxToken
            this.map = new this.$mapboxgl.Map({
                container: "map",
                style: this.$config.mapboxStyle,
                center: [2.3334804999999506, 46.8770224],
                zoom: 5.2
            })
        },

        loadPoly(map, polyDepartment) {
            map.on("load", function() {
                // Add polygones
                map.addLayer(polyDepartment)

                // Add Number of departments
                map.addLayer({
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
                map.addLayer({
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

        forwardGeocoder(query) {
            const matchingFeatures = []
            for (let i = 0; i < this.customData.features.length; i++) {
                const feature = this.customData.features[i]

                if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
                    feature.place_name = "🌲 " + feature.properties.title
                    feature.center = feature.geometry.coordinates
                    feature.place_type = ["park"]
                    matchingFeatures.push(feature)
                }
            }
            return matchingFeatures
        },

        // Map Configuration
        configMap(map) {
            map.addControl(new this.$MapboxGeocoder({
                accessToken: this.$mapboxgl.accessToken,
                localGeocoder: this.forwardGeocoder,
                zoom: 7.2,
                placeholder: "Rechercher un lieu",
                mapboxgl: this.$mapboxgl
            }))

            map.dragPan._state = "enabled"
            map.dragRotate._state = "disabled"
            map.doubleClickZoom._enabled = false
            map.transform._minZoom = 3.75

            // Delete Mapbox tags
            document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove()
            document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove()
        },

        detectIfClickIsInside(map) {
            map.on("click", (e) => {
                this.findingResellers = false

                this.clickCoordinates = [e.lngLat.lng, e.lngLat.lat]
                this.polyDepartment.source.data.features.forEach((poly) => {
                    const polyDepartmentIsInside = this.$turf.inside(this.clickCoordinates, poly)

                    if (polyDepartmentIsInside === true) {
                        new Promise((resolve) => {
                            resolve(
                                this.map.flyTo({
                                    center: this.clickCoordinates,
                                    zoom: 6.2
                                })
                            )
                        }).then(() => {
                            setTimeout(() => {
                                this.polySelected = poly
                                this.findingResellers = true
                            }, 100)
                        })
                    }
                })
            })
        }
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
