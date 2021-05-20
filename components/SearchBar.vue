<template>
    <div class="searchbar" />
</template>

<script>
export default {
    name: "Reseller",
    props: {
        dep: {
            type: Number,
            default: () => (0)
        }, 
    },
    components: {},
    data: () => ({
        adresseSearchBar: "",
        searchBarData: {
            adressFull: "",
            adress: "",
            city: "",
            dp: 0
        }
    }),
    computed: {},
    methods: {
        init () {
            // Trouver solution pour eviter utilisation du setTimeout
            setTimeout(() => {
                document.querySelector(".mapboxgl-ctrl-geocoder--input").addEventListener("focus", () => {
                    this.addEventOnElements()
                })
            }, 100);
        },

        addEventOnElements: function () {
            const array = document.getElementsByClassName("mapboxgl-ctrl-geocoder--suggestion")
            array.forEach(element => {
                element.addEventListener("click", this.detectAdresseClicked(element))
            }); 
        },

        detectAdresseClicked: function (element) {
            const inputValue = document.querySelector(".mapboxgl-ctrl-geocoder--input").value
            this.searchBarData =  {
                adressFull: element.children[0].innerHTML + "," + element.children[1].innerHTML,
                adress: element.children[0].innerHTML,
                city: element.children[1].innerHTML,
            }
            if (inputValue ===  this.searchBarData.adressFull) {
                this.compareAdressAndInputValue(inputValue)
            }
        },
        compareAdressAndInputValue(inputValue) {
            const inputValueSplited = inputValue.split(" ")
            const even = (element) => element === "France"

            if (inputValueSplited.some(even)) { 
                inputValue.split(" ").forEach(element => {
                    if (element.includes(",")) {
                        element = element.substr(0, element.length - 1)
                    }
                    if (this.isNumeric(element) === true && element.length === 5 ) {
                        this.searchBarData.dp = element
                        this.$emit("getSearchBarData", this.searchBarData);
                    }
                });
            }
        },

        isNumeric(str) {
            if (typeof str != "string") return false 
            return !isNaN(str) &&
                !isNaN(parseFloat(str)) 
        }
    },
    watch: {
        dep: function() {
            document.querySelector(".mapboxgl-ctrl-geocoder--input").value = this.dep
            // console.log("department: ", this.dep)
        },
    },
    mounted() {
        this.init()
    },
}
</script>

<style lang="scss" scoped>
$margin-sm: 0.5rem;

.searchbar {
    border-radius: 0.5rem;
    border: none;
    padding: 0 $margin-sm;
}
</style>