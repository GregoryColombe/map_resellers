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
            result.forEach((element) => {
                // console.log("element0 : ", element[0]);
                // console.log("this.polySelected.properties.code : ", this.polySelected.properties.code);
                this.isInZoneAction(element)
            })
        },

        isInZoneAction(element) {
            const revendeurZoneAction = element[1].zone_action.split(";")

            revendeurZoneAction.forEach((revendeurZoneActionItem) => {
                if (revendeurZoneActionItem === this.polySelected.properties.code) {
                    // console.log("OKKKKKKK");
                    // console.log("element[1].id_user : ", element[1].id_user);
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
