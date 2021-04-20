<template>
  <div />
</template>

<script>

export default {
    name: "Resellers",
    props: {
        findingResellers: Boolean,
        polyDepartment: {
            type: Object,
            default: () => ({})
        },
        polySelected: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        resellersData: ""
    }),
    watch: {
        findingResellers() {
            if (this.findingResellers === true) {
                this.findResellers()
            }
        }
    },
    mounted() {
        this.init()
    },

    methods: {
        async getData() {
            this.resellersData = await this.$axios.$get("/resellersData.json")
        },

        init() {
            this.getData()
        },

        findResellers() {
            const result = []

            for (const i in this.resellersData) {
                result.push([i, this.resellersData[i]])
            }
            result.forEach((reseller) => {
                this.isInZoneAction(reseller)
            })
        },

        isInZoneAction(reseller) {
            const revendeurZoneAction = reseller[1].zone_action.split(";")

            revendeurZoneAction.forEach((revendeurZoneActionItem) => {
                if (revendeurZoneActionItem === this.polySelected.properties.code) {
                    console.log("Find a reseller :")
                    console.log("Id_user : ", reseller[1].id_user)
                    console.log("Société user : ", reseller[1].societe_user)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
