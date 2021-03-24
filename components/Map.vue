<template>
    <div>
        <div id="map"></div>
        <Resellers />
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import axios from 'axios'

export default {
    name: 'Map',
    data() {
        return {
            map:'',
            customData: '',
        }
    },
    mounted() {
        this.initMap()
        this.addCustomData()
        this.configMap(this.map)
        this.getPolyDepartment()
    },
    
    methods: {
        async getPolyDepartment() {
            const polyDepartment = await this.$axios.$get('/polyDepartment.json')
            this.loadPoly(this.map, polyDepartment)
        },
        
        initMap: function () {
            mapboxgl.accessToken =
                'pk.eyJ1IjoiZ3JlZ29yeWNvbG9tYmUiLCJhIjoiY2sxdWY0bXJyMDV2bDNjcW1rdnI5azM4byJ9.6csVhKC7yWAmHFl6OmFBCw';
            this.map = new mapboxgl.Map({
                container: 'map',
                // style: 'mapbox://styles/mapbox/streets-v11',
                style: 'mapbox://styles/gregorycolombe/ck52ab1nu0eag1cpqsoaf6rkv',
                center: [2.3334804999999506, 46.8770224],
                zoom: 5.2
            });
        },

        loadPoly: function (map, polyDepartment) {
            map.on('load', function () {
                // Add polygones
                map.addLayer(polyDepartment)

                // Add Number of departments
                map.addLayer({
                    "id": "text-departement",
                    "type": "symbol",
                    "source": "departement-delimitation",
                    "layout": {
                        "text-field": "{code}",
                        "text-font": [
                            "DIN Offc Pro Medium",
                            "Arial Unicode MS Bold"
                        ],
                        "text-size": 14,
                    },
                    paint: {
                        "text-color": "#fff"
                    }
                });

                // Add Lines of Polygones
                map.addLayer({
                    "id": "line-departement",
                    "type": "line",
                    "source": "departement-delimitation",
                    "layout": {},
                    "paint": {
                        "line-color": "#4fa9dd",
                        "line-width": 0.5
                    }
                });
            })
        },

        // Add custom data
        addCustomData: function () {
            this.customData = {
                    "features": [{
                            "type": "Feature",
                            "properties": {
                                "title": "Lincoln Park",
                                "description": "A northside park that is home to the Lincoln Park Zoo"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.637596,
                                    41.940403
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Burnham Park",
                                "description": "A lakefront park on Chicago's south side"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.603735,
                                    41.829985
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Millennium Park",
                                "description": "A downtown park known for its art installations and unique architecture"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.622554,
                                    41.882534
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Grant Park",
                                "description": "A downtown park that is the site of many of Chicago's favorite festivals and events"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.619185,
                                    41.876367
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Humboldt Park",
                                "description": "A large park on Chicago's northwest side"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.70199,
                                    41.905423
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Douglas Park",
                                "description": "A large park near in Chicago's North Lawndale neighborhood"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.699329,
                                    41.860092
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Calumet Park",
                                "description": "A park on the Illinois-Indiana border featuring a historic fieldhouse"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.530221,
                                    41.715515
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Jackson Park",
                                "description": "A lakeside park that was the site of the 1893 World's Fair"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.580389,
                                    41.783185
                                ],
                                "type": "Point"
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "title": "Columbus Park",
                                "description": "A large park in Chicago's Austin neighborhood"
                            },
                            "geometry": {
                                "coordinates": [
                                    -87.769775,
                                    41.873683
                                ],
                                "type": "Point"
                            }
                        }
                    ],
                    "type": "FeatureCollection"
            };
        },
    
        forwardGeocoder: function (query) {
            var matchingFeatures = [];
            for (var i = 0; i < this.customData.features.length; i++) {
                var feature = this.customData.features[i];
            
                if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
                    feature['place_name'] = '🌲 ' + feature.properties.title;
                    feature['center'] = feature.geometry.coordinates;
                    feature['place_type'] = ['park'];
                    matchingFeatures.push(feature);
                }
            }
            return matchingFeatures;
        },

        //Map Configuration
        configMap: function (map) {
            map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                localGeocoder: this.forwardGeocoder,
                zoom: 7.2,
                placeholder: "Rechercher un lieu",
                mapboxgl: mapboxgl
            }));

            map.dragPan._state = "enabled"
            map.dragRotate._state = "disabled"
            map.doubleClickZoom._enabled = false
            map.transform._minZoom = 3.75

            //Delete Mapbox tags
            document.getElementsByClassName("mapboxgl-ctrl-bottom-left")[0].remove()
            document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].remove()
        }
    },
}
</script>

<style lang="scss">
#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
</style>