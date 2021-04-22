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
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default {
    name: "Map",
    data: () => ({
        map: {},
        polyDepartment: {},
        customData: "",
        clickCoordinates: [],
        findingResellers: false,
        polySelected: {}
    }),
    mounted() {
        this.initMap()
        this.addCustomData()
        this.configMap(this.map)
        this.getPolyDepartment()
        this.detectIfClickIsInside(this.map)

        console.log(this.$config)
    },

    methods: {
        async getPolyDepartment() {
            this.polyDepartment = await this.$axios.$get("/polyDepartment.json")
            this.loadPoly(this.map, this.polyDepartment)
        },

        initMap() {
            mapboxgl.accessToken = this.$config.mapboxToken
            this.map = new mapboxgl.Map({
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

        // Add custom data
        addCustomData() {
            this.customData = {
                features: [{
                    type: "Feature",
                    properties: {
                        title: "Lincoln Park",
                        description: "A northside park that is home to the Lincoln Park Zoo"
                    },
                    geometry: {
                        coordinates: [
                            -87.637596,
                            41.940403
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Burnham Park",
                        description: "A lakefront park on Chicago's south side"
                    },
                    geometry: {
                        coordinates: [
                            -87.603735,
                            41.829985
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Millennium Park",
                        description: "A downtown park known for its art installations and unique architecture"
                    },
                    geometry: {
                        coordinates: [
                            -87.622554,
                            41.882534
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Grant Park",
                        description: "A downtown park that is the site of many of Chicago's favorite festivals and events"
                    },
                    geometry: {
                        coordinates: [
                            -87.619185,
                            41.876367
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Humboldt Park",
                        description: "A large park on Chicago's northwest side"
                    },
                    geometry: {
                        coordinates: [
                            -87.70199,
                            41.905423
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Douglas Park",
                        description: "A large park near in Chicago's North Lawndale neighborhood"
                    },
                    geometry: {
                        coordinates: [
                            -87.699329,
                            41.860092
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Calumet Park",
                        description: "A park on the Illinois-Indiana border featuring a historic fieldhouse"
                    },
                    geometry: {
                        coordinates: [
                            -87.530221,
                            41.715515
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Jackson Park",
                        description: "A lakeside park that was the site of the 1893 World's Fair"
                    },
                    geometry: {
                        coordinates: [
                            -87.580389,
                            41.783185
                        ],
                        type: "Point"
                    }
                },
                {
                    type: "Feature",
                    properties: {
                        title: "Columbus Park",
                        description: "A large park in Chicago's Austin neighborhood"
                    },
                    geometry: {
                        coordinates: [
                            -87.769775,
                            41.873683
                        ],
                        type: "Point"
                    }
                }
                ],
                type: "FeatureCollection"
            }
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
            map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                localGeocoder: this.forwardGeocoder,
                zoom: 7.2,
                placeholder: "Rechercher un lieu",
                mapboxgl
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
