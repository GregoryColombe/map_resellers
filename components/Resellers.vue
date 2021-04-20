<template>
    <div class="resellers">
        <div class="resellers_number">
            <h1>2 revendeurs trouvés</h1>
        </div>

        <div class="resellers_data">
            <ul class="resellers_list">
                <li 
                    v-for="(reseller, i) in resellers" 
                    :key="i" 
                    class="resellers_list_item"
                >
                    <p>{{ reseller[1].societe_user }}</p>
                    <p>{{ reseller[1].adresse1_user }}</p>
                    <p>{{ reseller[1].cp_user }}</p>
                    <p>{{ reseller[1].tel_user }}</p>
                </li>
            </ul>
        </div>
    </div>
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
        resellersData: "",
        resellers: [],
        items: [
            { prenom: "gregory" },
            { prenom: "pablo" }
        ]
    }),
    watch: {
        findingResellers() {
            if (this.findingResellers === true) {
                this.resellers = []
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
            result.forEach((reseller) => {
                this.isProximite(reseller)
                this.isAgree(reseller)
            })
        },

        isProximite(reseller) {
            const revendeurZoneAction = reseller[1].zone_action.split(";")

            revendeurZoneAction.forEach((revendeurZoneActionItem) => {
                if (revendeurZoneActionItem === this.polySelected.properties.code) {
                    reseller.type = "proximité"
                    this.resellers.push(reseller)
                }
            })
        },

        isAgree(reseller) {
            if (reseller[1].cp_user.length > 2) {
                reseller[1].cp_user = reseller[1].cp_user.slice(0, 2)
            }

            if (reseller[1].cp_user === this.polySelected.properties.code) {
                reseller.type = "agree"
                this.resellers.push(reseller)
            }
        }
    }
}
</script>

<style lang="scss">
.resellers {
    position: relative;
    top: 0;
    left: 0;
    height: 100vh;
    width: 40vw;
    background: #fff;

    &_data {
        color:#fff;

        &_item {
            background-color: #4fa9dd;
            margin: 1rem 2rem;
            padding: 1rem 2rem;

            &_name {
                font-weight: bold;
            }

            &_name, &_adress, &_codeAndCity, &_telephone {
                margin-bottom: 0.25rem;
            }
        }
    }
}
</style>
