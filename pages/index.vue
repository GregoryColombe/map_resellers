<template>
    <div class="container">
        <Map />
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$config.baseURL)
    }
}
</script>

<style lang="scss" scoped>
</style>
