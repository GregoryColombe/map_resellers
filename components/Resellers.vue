<template>
    <div>

    </div>
</template>

<script>

export default {
    name: 'Resellers',
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
        }
    }
}
</script>

<style lang="scss">

</style>