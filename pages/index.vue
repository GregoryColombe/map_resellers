<template>
    <div class="container">
        <div
            id="map"
            ref="map"
        />
        <Resellers
            :localisation-department="localisationDepartment"
            :search-bar-data="searchBarData"
        />

        <div class="container_ui">
            <SearchBar
                :dep="this.dep"
                @getSearchBarData="getSearchBarData"
            />
            <div class="container_ui_btn">
                <button @click="localiseUser">
                    Me localiser
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Map from "~/class/mapboxgl/Map"
import "mapbox-gl/dist/mapbox-gl.css"

import { getCoordinatesByAddress, getAddressByCoordinates  } from "~/services/Map"
import { mapActions, mapGetters } from "vuex"

import Resellers from "~/components/Resellers"
import SearchBar from "~/components/SearchBar"


export default {
    components: {
        Resellers,
        SearchBar
    },
    data: () => ({
        localisationCoordinates: [],
        localisationDepartment: 0,
        dep: 0,
        colors: {
            agree: "#0abbe3",
            proximity: "#ee5253",
            selected: "#00FF00",
        },
        searchBarData: {}
    }),
    computed: {
        ...mapGetters({
            resellers: "map/getResellers"
        })
    },
    methods: {
        ...mapActions({
            getResellersByDep: "map/getResellersByDep"
        }),

        formatAddressToURL(address) {
            return address.replace(
                new RegExp(" ", "g"),
                "+"
            )
        },
        setResellersMarkers(object) {
            for(let key in object) {
                if(Object.prototype.hasOwnProperty.call(object, key)) {
                    object[key].forEach(item => {
                        const address = this.formatAddressToURL(item.adresse1_user)

                        getCoordinatesByAddress(address, item.cp_user)
                            .then(resp => {
                                const coordinates = resp.data.features[0].geometry.coordinates
                                this.map.addMarker(coordinates,this.colors[key])
                            }).catch((error) => {
                                console.error(error)
                            })
                    })
                }
            }
        },

        onEnter() {
            const { map } = this.$refs

            this.$TweenMax.to(map, {
                duration: .5,
                width: "calc(100% - 50px)",
                height: "calc(100% - 50px)"
            })
        },
        onLeave() {
            const { map } = this.$refs

            this.$TweenMax.to(map, {
                duration: .5,
                width: "100%",
                height: "calc(100% + 1px)"
            })
        },

        localiseUser() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map.destroyMarkers()
                this.localisationCoordinates = []
                this.localisationDepartment = 0

                this.localisationCoordinates.push(position.coords.longitude, position.coords.latitude)
                this.map.zoomInMap(this.localisationCoordinates)
                this.getCodeUserPosition(position.coords.longitude, position.coords.latitude)
            })
        },

        activeGeoLoc() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(() => {
                    this.$TweenMax.to(".container_ui_btn", {
                        duration: .5,
                        display: "block",
                        opacity: 1
                    })
                })
            }
        },

        getCodeUserPosition(long, lat) {
            getAddressByCoordinates(long, lat)
                .then(resp => {
                    this.localisationDepartment = parseInt(resp.data.features[0].properties.citycode.substr(0, 2))
                    this.dep = this.localisationDepartment
                })
        },

        getSearchBarData(value) {
            this.map.destroyMarkers()
            this.searchBarData = value
        },
    },
    watch: {
        resellers: {
            handler(value) {
                if(value) {
                    this.setResellersMarkers(value)
                    this.$nextTick(() => this.onEnter() )
                } else {
                    this.map.resetSelectedDepartment()
                    this.$nextTick(() => this.onLeave() )
                }
            },
            deep: true
        },
    },
    mounted() {
        this.map = new Map({
            token: process.env.MAPBOX_TOKEN,
            style: process.env.MAPBOX_STYLE,
            center: [2.3334804999999506, 46.8770224],
            zoom: 5,
            minZoom: 5
        })

        this.map.setPolygonsDepartments()
        this.map.onSelectedDepartment(
            coordinates => {
                this.map.addMarker(coordinates, this.colors.selected)
                this.getResellersByDep(this.map.getCodeDepartmentSelected())
                this.dep = parseInt(this.map.getCodeDepartmentSelected())
            },
            () => {
                this.getResellersByDep(null)
            }
        )

        this.activeGeoLoc()
    },
    destroyed() {
        this.map.destroy()
    }
}
</script>

<style lang="scss" scoped>
$background: #f5f8fe;
$btn-color: rgba(238, 82, 83, 0.95);
$margin-sm: 0.5rem;
$margin-md: 1rem;

.container {
    background-color: $background;
    position: relative;
    width: 100vw;
    height: 100vh;

    #map {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: calc(100% + 1px);
    }

    &_ui {
        position: absolute;
        top: 2rem;
        right: 2.5rem;
        display: flex;
        align-items: center;

        &_geocoder {
            border-radius: 0.5rem;
            border: none;
            padding: 0 $margin-sm;
        }

        &_btn {
            display: none;
            opacity: 0;

            button {
                border: none;
                background: $btn-color;
                color: $background;
                padding: $margin-sm $margin-md;
                border-radius: 0.5rem;

                &:hover {
                    cursor: pointer;
                    color: $btn-color;
                    background-color: $background;
                    transition: 0.25s ease-in-out;
                }
            }
        }
    }
}

@media screen and (max-width: 950px) {
    .container_ui {
        right: initial;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 1rem;

        &_btn {
            margin-right: 0.5rem;
        }
    }
}
</style>
