<template>
    <li class="reseller">
        <header class="reseller-header">
            <p>#{{ data.id_user }}</p>
            <h2>{{ data.societe_user }}</h2>
        </header>

        <section class="reseller-content">
            <div class="reseller-content--address">
                <p>{{ data.adresse1_user }}</p>
                <p>{{ data.ville_user.toUpperCase() }}</p>
                <p>{{ data.cp_user }}</p>
            </div>

            <div :class="['reseller-content--type', `reseller-content--type__${type.toLocaleLowerCase()}`]">
                <p>{{ type }}</p>
            </div>
        </section>

        <hr class="--separator">

        <footer class="reseller-footer">
            <div v-if="data.tel_user">
                <fa-icon icon="phone" />
                <p>{{ data.tel_user }}</p>
            </div>

            <div v-if="data.mail_user">
                <a
                    :href="`mailto:${data.mail_user}`"
                    target="_blank"
                >
                    <fa-icon icon="envelope" />
                    <p>{{ data.mail_user }}</p>
                </a>
            </div>

            <div v-if="data.siteweb_user">
                <a
                    :href="`https://${data.siteweb_user}`"
                    target="_blank"
                >
                    <fa-icon icon="globe" />
                    <p>{{ data.siteweb_user }}</p>
                </a>
            </div>
        </footer>
    </li>
</template>

<script>
export default {
    name: "Reseller",
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String,
            default: ""
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
$background: #f5f8fe;
$font-color: #43435c;
$icon-color: #cecfda;

$margin-sm: 0.5rem;

.reseller {
    background-color: white;
    margin-bottom: 20px;
    padding: $margin-sm;
    border-radius: 10px;

    &:last-child {margin-bottom: 0}

    p {font-size: 12px;}

    &-header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin-bottom: $margin-sm;

        h2, p {
            color: $font-color;
            font-weight: bold;
            font-size: 15px;
        }
        p {font-size: 12px}

    }
    &-content {
        display: flex;
        justify-content: space-between;

        &--address {color: $icon-color}
        &--type {
            height: 25px;

            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;

            border-radius: 5px;

            &__proximity {
                background-color: rgba(238, 82, 83, 0.25);
                color: rgb(238, 82, 83);
            }

            &__agree {
                background-color: rgba(10, 189, 227, 0.25);
                color: rgb(10, 189, 227)
            }
        }
    }
    &-footer {
        div {
            display: flex;
            align-items: center;

            margin-bottom: 10px;

            svg {
                width: 15px;
                height: 15px;
                color: $font-color;
            }

            p {
                margin-left: 10px;
                color: $font-color;
            }
            a {
                display: flex;
                align-items: center;
                text-decoration: none
            }
        }
    }

    .--separator {
        height: 1px;
        width: 100%;
        margin: $margin-sm 0;
        border: none;
        background-color: $background;
    }
}
</style>
