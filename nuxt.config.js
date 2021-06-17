require("dotenv").config()

export default {
    target: "static",
    ssr: false,
    head: {
        title: "Abvent | Carte Revendeurs",
        htmlAttrs: {
            lang: "fr"
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ]
    },
    env: {
        BASE_URL: process.env.BASE_URL || "",
        MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
        MAPBOX_STYLE: process.env.MAPBOX_STYLE
    },
    privateRuntimeConfig: {},
    css: [
        "~/assets/style/style.scss"
    ],
    plugins: [
        "~/plugins/extensions.client.js"
    ],
    components: false,
    buildModules: [
        "@nuxtjs/eslint-module",
        "@nuxtjs/fontawesome",
        "@nuxtjs/dotenv"
    ],
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/dotenv"
    ],
    fontawesome: {
        component: "fa",
        suffix: true,
        icons: {
            solid: ["faPhone", "faTimes", "faEnvelope", "faGlobe"]
        }
    },
    axios: {
        baseURL: process.env.BASE_URL
    },
    build: {}
}
