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
      console.log(process.env.BASE_URL)
    },

    methods: {
        async getData() {
            this.resellersData = await this.$axios.$get('/resellersData.json')
        },

        init: function() {
            this.getData()
        },

        findResellers: function() {
            console.log("liste de tout les polygones : ", this.polyDepartment);
            console.log("Polygone selectionné : ", this.polySelected);
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
