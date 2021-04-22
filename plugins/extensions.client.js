import Vue from "vue"

import "mapbox-gl/dist/mapbox-gl.css"

import * as turf from "@turf/turf"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

Vue.prototype.$turf = turf
Vue.prototype.$mapboxgl = mapboxgl
Vue.prototype.$MapboxGeocoder = MapboxGeocoder
