<template>
    <div
        class="container"
        id="toto"
    >
        <div />
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
