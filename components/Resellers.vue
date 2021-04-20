<template>
    <div class="resellers">
        <div class="resellers_number">
            <h1>2 revendeurs trouvés</h1>
        </div>
        <div class="resellers_data"></div>
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
        },

        init: function() {
            this.getData()
        },

        findResellers: function() {
            let result = [];
            for(var i in this.resellersData) {
                result.push([i, this.resellersData[i]]);
            }
            result.forEach(reseller => {
                this.isInZoneAction(reseller)
            });
        },

        isInZoneAction: function (reseller) {
            const revendeurZoneAction = reseller[1].zone_action.split(";")

            revendeurZoneAction.forEach(revendeurZoneActionItem => {
                if (revendeurZoneActionItem == this.polySelected.properties.code) {
                    console.log("toto : ", this.polySelected, reseller[1].cp_user);

                    // this.addModal(reseller)

                    // if () {

                    // }
                }
            }) 
            if (reseller[1].cp_user.length > 2) {
                reseller[1].cp_user = reseller[1].cp_user.slice(0, 2)

                if (reseller[1].cp_user == this.polySelected.properties.code) {
                    console.log("OKK IS GOOD");
                }
            }
        },
    

        addModal: function (reseller) {
            // Create div resellers_data_item
            let modal = document.createElement("div")
            let modal_text = document.createTextNode(" ")
            modal.setAttribute("class", "resellers_data_item")
            modal.appendChild(modal_text) 
            document.querySelectorAll(".resellers_data")[0].appendChild(modal)

            //  Create all elements
            this.createTexElement("p", reseller[1].societe_user, "resellers_data_item_name", modal)
            this.createTexElement("p", reseller[1].adresse1_user, "resellers_data_item_adress", modal)
            this.createTexElement("p", reseller[1].cp_user + " " + reseller[1].ville_user, "resellers_data_item_codeAndCity", modal)
            this.createTexElement("p", "Tel : " + reseller[1].tel_user, "resellers_data_item_telephone", modal)
        },

        createTexElement: function(target, text, idName, modal){
            let element = document.createElement(target)
            let element_text = document.createTextNode(text)
            element.setAttribute("class", idName)
            element.appendChild(element_text)
            modal.appendChild(element)
        },

        deleteAllElement: function() {
            document.querySelectorAll(".resellers_data_item").forEach((e) => e.remove())
        }
    },
    watch: {
        findingResellers: function () {
            if (this.findingResellers === true) {
                this.deleteAllElement()
                this.findResellers()
            }
        },
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