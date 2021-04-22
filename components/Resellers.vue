<template>
    <div 
        v-if="findingResellers" 
        class="resellers"
    >
        <div class="resellers_header">
            <p 
                v-if="resellersNumber" 
                class="resellers_header_number"
            >
                {{ resellersNumber }} <span>{{ resellersNumberDescription }}</span>
            </p>
        </div>

        <ul class="resellers_list">
            <li 
                v-for="(reseller, i) in resellers" 
                :key="i" 
                class="resellers_list_item"
            >
                <p class="resellers_list_item_name">
                    {{ reseller[1].societe_user }}
                </p>
                <p class="resellers_list_item_type">
                    Revendeur <span v-if="reseller[1].type === 'proximité'">de</span> {{ reseller[1].type }}
                </p>
                <p class="resellers_list_item_adress">
                    {{ reseller[1].adresse1_user }} {{ reseller[1].cp_user }}
                </p>
                <p class="resellers_list_item_telephone">
                    {{ reseller[1].tel_user }}
                </p>
            </li>
        </ul>
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
        },
    },
    data: () => ({
        resellersData: "",
        resellers: [],
        resellersProximity: [],
        resellersApproved: [],
        resellersNumber: 0,
        resellersNumberDescription: ""
    }),
    watch: {
        findingResellers() {
            if (this.findingResellers === true) {
                this.resellers = []
                this.resellersApproved = []
                this.resellersProximity = []
                this.findResellers()
            }
        },
        resellersNumber() {
            if (this.resellersNumber === 1) {
                this.resellersNumberDescription = "revendeur trouvé"
            }
            else if (this.resellersNumber > 1){
                this.resellersNumberDescription = "revendeurs trouvés"
            }
        },
        resellers() {
            // console.log("this.resellersNumber : ", this.resellersNumber);
            this.$emit("getResellers", this.resellers)
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
                    reseller[1].type = "proximité"
                    reseller[1].proximity = this.resellers.length
                    this.resellers.push(reseller)
                    this.resellersProximity.push(reseller[1].type)
                    this.changeResselersNumber()
                }
            })
        },

        isAgree(reseller) {
            const cpFormated = reseller[1].cp_user.slice(0, 2)

            if (cpFormated === this.polySelected.properties.code) {
                reseller[1].type = "agrée"
                reseller[1].agree = this.resellers.length
                this.resellers.push(reseller)
                this.resellersApproved.push(reseller[1].type)
                this.changeResselersNumber()
            }
        },

        changeResselersNumber() {
            this.resellersNumber = this.resellersApproved.length + this.resellersProximity.length
        }
    },
}
</script>

<style lang="scss">
.resellers {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 80vh;
    width: 35vw;
    background: #fff;
    
    &_header {
        background-color: #2c2b2c;
        color: #fff;
        text-align: center;
        padding: 2rem;

        &_number {
            font-size: 1.25rem;
            font-weight: 700;
        }
    }

    &_list {
        padding: 0;
        color:#fff;

        &_item {
            background-color: #4fa9dd;
            margin: 1rem 2rem;
            padding: 1rem 2rem;

            &_name {
                font-weight: bold;
                font-size: 1rem;
            }

            &_name, &_type, &_adress, &_telephone {
                margin-bottom: 0.25rem;
            }
        }
    }
}
</style>
