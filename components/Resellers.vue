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
            // console.log("this.resellersData : ", this.resellersData);
        },

        init: function() {
            this.getData()
        },

        findResellers: function() {
            console.log("liste de tout les polygones : ", this.polyDepartment);
            console.log("Polygone selectionné : ", this.polySelected);

            // let revendeurs= []
            // let i = 0
            // revendeurs.push(this.resellersData)

            // revendeurs.forEach((resellers) => {
            //     i++
            //     console.log("resellers", resellers[i]);
                
            //     if (resellers[i].visible_carte === 1) {
            //         console.log("okk !!!");
            //     }
            // })
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