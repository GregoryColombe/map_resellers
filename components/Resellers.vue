<template>
    <div>

    </div>
</template>

<script>

export default {
    name: 'Resellers',
    props: {
        findingResellers: Boolean,
        polyDepartment: Object,
        polySelected: Object
    },
    data() {
        return {
            resellersData: ''
        }
    },
    mounted() {
        this.init()
    },

    methods: {
        async getData() {
            this.resellersData = await this.$axios.$get('/resellersData.json')
        },

        init: function() {
            this.getData()
        },

        findResellers: function() {
            let result = [];

            for(var i in this.resellersData) {
                result.push([i, this.resellersData[i]]);
            }
            result.forEach(reseller => {
                this.isInZoneAction(reseller)
            });
        },

        isInZoneAction: function (reseller) {
            const revendeurZoneAction = reseller[1].zone_action.split(";")

            revendeurZoneAction.forEach(revendeurZoneActionItem => {
                if (revendeurZoneActionItem == this.polySelected.properties.code) {
                    console.log("Find a reseller :");
                    console.log("Id_user : ", reseller[1].id_user);
                    console.log("Société user : ", reseller[1].societe_user);
                }
            }) 
        }
    },
    watch: {
        findingResellers: function () {
            if (this.findingResellers === true) {
                this.findResellers()
            }
        },
    }
}
</script>

<style lang="scss">

</style>