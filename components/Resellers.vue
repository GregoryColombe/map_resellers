<template>
    <div 
        v-if="resellersNumber" 
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
                v-for="(item, i) in resellers.proximite"
                :key="'proximite-' + i"
                class="resellers_list_item"
            >
                <p class="resellers_list_item_name">
                    {{ item.societe_user }}
                </p>
                <p class="resellers_list_item_type">
                    Revendeur de proximité
                </p>
                <p class="resellers_list_item_adress">
                    {{ item.adresse1_user }} {{ item.cp_user }}
                </p>
                <p class="resellers_list_item_telephone">
                    {{ item.tel_user }}
                </p>
            </li>
            <li 
                v-for="(item, i) in resellers.agreer"
                :key="'agreer-' + i"
                class="resellers_list_item"
            >
                <p class="resellers_list_item_name">
                    {{ item.societe_user }}
                </p>
                <p class="resellers_list_item_type">
                    Revendeur agrée
                </p>
                <p class="resellers_list_item_adress">
                    {{ item.adresse1_user }} {{ item.cp_user }}
                </p>
                <p class="resellers_list_item_telephone">
                    {{ item.tel_user }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    name: "Resellers",
    props: {
        polyDepartment: {
            type: Object,
            default: () => ({})
        },
        polySelected: {
            type: Array,
            default: () => ([])
        },
    },
    data: () => ({
        resellersData: "",
        resellersNumber: 0,
        resellersNumberDescription: "",
    }),
    computed: {
        ...mapGetters({
            resellers: "map/getResellers"
        })
    },
    watch: {
        polySelected() {
            // console.log("polySelected : ", this.polySelected);
            this.findResellers()
        },
        resellers() {
            this.changeResselersNumber()
        },
        resellersNumber() {
            if (this.resellersNumber === 1) {
                this.resellersNumberDescription = "revendeur trouvé"
            }
            else if (this.resellersNumber > 1){
                this.resellersNumberDescription = "revendeurs trouvés"
            }
        },
    },
    mounted() {
<<<<<<< HEAD
      this.init()
      console.log(process.env.BASE_URL)
=======
        this.getData()
>>>>>>> dev
    },

    methods: {
        ...mapActions({
            getResellersByDep: "map/getResellersByDep"
        }),

        async getData() {
            this.resellersData = await this.$axios.$get("/resellersData.json")
        },

        findResellers() {
            // this.polySelected.x.properties.code
            // if (this.findingResellers) {
            this.getResellersByDep(this.polySelected)
            // }
        },

        changeResselersNumber() {
            this.resellersNumber = this.resellers.agreer.length + this.resellers.proximite.length
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

<<<<<<< HEAD
=======
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
>>>>>>> dev
</style>
