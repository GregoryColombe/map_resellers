<template>
    <transition
        @enter="onEnter"
        @leave="onLeave"
    >
        <div
            ref="resellers"
            class="resellers"
            v-show="resellers"
        >
            <header class="resellers-header">
                <h1>Resellers List</h1>

                <button
                    class="--icon"
                    @click="onCloseModal"
                >
                    <fa-icon icon="times" />
                </button>
            </header>

            <section class="resellers-list">
                <ul v-if="resellers">
                    <Reseller
                        v-for="(data, i) in resellers.agree"
                        :key="`agree-${i}`"
                        :data="data"
                        type="Agree"
                    />

                    <Reseller
                        v-for="(data, i) in resellers.proximity"
                        :key="`proximity-${i}`"
                        :data="data"
                        type="Proximity"
                    />
                </ul>
            </section>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import Reseller from "~/components/Reseller"

export default {
    components: { Reseller },
    props: {},
    data: () => ({}),
    computed: {
        ...mapGetters({
            resellers: "map/getResellers"
        })
    },
    methods: {
        ...mapActions({
            getResellersByDep: "map/getResellersByDep"
        }),

        onCloseModal() {
            this.getResellersByDep(null)
        },

        //Animations
        onEnter() {
            const { resellers } = this.$refs
            const tl = new this.$TimelineLite({delay: .5})

            tl.to(resellers, {duration: .5, x: 0})
        },
        onLeave(el, done) {
            const { resellers } = this.$refs
            const tl = new this.$TimelineLite({onComplete: () => done()})

            tl.to(resellers, {duration: .5, x: "-100%"})
        }
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss">
$background: #f5f8fe;
$font-color: #43435c;
$icon-color: #cecfda;

.resellers {
    width: 30vw;
    height: 100vh;

    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);

    display: flex;
    flex-direction: column;

    padding: 25px;
    box-sizing: border-box;

    background-color: $background;

    .--icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 30px;
        height: 30px;

        background-color: white;
        color: $icon-color;

    }

    button {
        border: {
            style: none;
            radius: 5px
        }

        &:hover {cursor: pointer}
        &:focus {outline: none}
    }

    &-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 20px;

        h1 {
            font-size: 22px;
            color: $font-color;
        }
    }
    &-list {
        height: 100%;
        overflow-y: auto;

        border-radius: 10px;

        ul {
            padding: 0;
            margin: 0;

            list-style: none;
        }
    }
}
</style>
