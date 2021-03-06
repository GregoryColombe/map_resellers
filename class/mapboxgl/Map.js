import { getPolygonsDepartments } from "~/services/Map"

import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import mapboxgl from "mapbox-gl"

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

export default class Map {
    constructor(config) {
        this.config = config

        this.map   = {}
        this.polygons = {}
        this.markers = []
        this.departmentSelected = {}
        this.geocoder = {}

        this.init()
    }

    init() {
        const {token, style, center, zoom, minZoom} = this.config
        mapboxgl.accessToken = token
        this.map = new mapboxgl.Map({ container: "map", style, center, zoom, minZoom })

        this.map.dragPan.enable()
        this.map.dragRotate.disable()
        this.map.doubleClickZoom.disable()
        
        //Search bar
        let geocoder = new MapboxGeocoder({ 
            accessToken: "pk.eyJ1IjoiZ3JlZ29yeWNvbG9tYmUiLCJhIjoiY2sxdWY0bXJyMDV2bDNjcW1rdnI5azM4byJ9.6csVhKC7yWAmHFl6OmFBCw", // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            language: "fr-FR",
            marker: false,
            placeholder: "Rechercher un lieu",
            zoom: 6.2
        })

        document.querySelector(".searchbar").appendChild(geocoder.onAdd(this.map))
    }

    destroy() {
        this.map.remove()
    }
    resize() {
        this.map.resize()
    }

    setPolygonsDepartments() {
        getPolygonsDepartments()
            .then(resp => {
                this.polygons = resp.data

                this.map.on("load", () => {
                    // Add polygones
                    this.map.addLayer(this.polygons)

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
            })
    }

    addMarker(position, color) {
        const marker = new mapboxgl.Marker({ color }).setLngLat(position).addTo(this.map)
        this.markers.push(marker)
    }

    destroyMarkers() {
        this.markers.forEach(marker => {
            marker.remove()
        })
    }

    onSelectedDepartment(onSelected = () => {}, onUnselected = () => {}) {
        this.map.on("click", e => {
            const clickCoordinates = [e.lngLat.lng, e.lngLat.lat]
            const departments      = this.polygons.source.data.features
            const indexPointInPoly = departments.findIndex(x => booleanPointInPolygon(clickCoordinates, x))
            const checkPointInPoly = departments.some(x => booleanPointInPolygon(clickCoordinates, x))

            this.markers.length > 0 && this.destroyMarkers()

            if(checkPointInPoly) {
                this.map.flyTo({ center: clickCoordinates, zoom: 6.2 })

                if(indexPointInPoly !== undefined) {
                    this.departmentSelected = departments[indexPointInPoly]
                    onSelected(clickCoordinates)
                }

            } else {
                this.resetSelectedDepartment(onUnselected())
            }
        })
    }

    resetSelectedDepartment(onResetDepartments = () => {}) {
        const { center, zoom } = this.config

        this.markers.length > 0 && this.destroyMarkers()
        this.map.flyTo({ center, zoom })

        onResetDepartments()
    }

    getCodeDepartmentSelected() {
        return this.departmentSelected.properties.code
    }

    zoomInMap(coordinates) {
        this.map.flyTo({ center: coordinates, zoom: 9 })
    }
}