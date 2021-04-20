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
            result.forEach(element => {
                // console.log("element0 : ", element[0]);
                // console.log("this.polySelected.properties.code : ", this.polySelected.properties.code);
                this.isInZoneAction(element)
            });
        },

        isInZoneAction: function (element) {
            const revendeurZoneAction = element[1].zone_action.split(";")

            revendeurZoneAction.forEach(revendeurZoneActionItem => {
                if (revendeurZoneActionItem == this.polySelected.properties.code) {
                    // console.log("OKKKKKKK");
                    // console.log("element[1].id_user : ", element[1].id_user);
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