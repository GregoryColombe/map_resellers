<template>
    <div class="container">
        <div
            id="map"
            ref="map"
        />

        <Resellers />
    </div>
</template>

<script>
import Map from "~/class/mapboxgl/Map"
import "mapbox-gl/dist/mapbox-gl.css"

import { getCoordinatesByAddress } from "~/services/Map"
import { mapActions, mapGetters } from "vuex"

import Resellers from "~/components/Resellers"

export default {
    components: {
        Resellers
    },
    data: () => ({
        colors: {
            agree: "#0abbe3",
            proximity: "#ee5253",
            selected: "#00FF00"
        }
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
                            })
                    })
                }
            }
        },

        onEnter() {
            const { map } = this.$refs
            const tl      = new this.$TimelineLite()

            tl.to(map, {duration: .5, width: "calc(100% - 50px)", height: "calc(100% - 50px)"})
        },
        onLeave() {
            const { map } = this.$refs
            const tl      = new this.$TimelineLite({delay: .5})

            tl.to(map, {duration: .5, width: "100%", height: "calc(100% + 1px)"})
        }
    },
    watch: {
        resellers: {
            handler(value) {
                if(value) {
                    this.setResellersMarkers(value)
                    this.onEnter()
                } else {
                    this.map.resetSelectedDepartment()
                    this.onLeave()
                }

            },
            deep: true
        }
    },
    mounted() {
        this.map = new Map({
            token: this.$config.mapboxToken,
            style: this.$config.mapboxStyle,
            center: [2.3334804999999506, 46.8770224],
            zoom: 5,
            minZoom: 5
        })

        this.map.setPolygonsDepartments()
        this.map.onSelectedDepartment(
            coordinates => {
                this.map.addMarker(coordinates, this.colors.selected)
                this.getResellersByDep(this.map.getCodeDepartmentSelected())
            },
            () => {
                this.getResellersByDep(null)
            }
        )
    },
    destroyed() {
        this.map.destroy()
    }
}
</script>

<style lang="scss" scoped>
$background: #f5f8fe;

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
}
</style>
