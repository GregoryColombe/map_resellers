export default {
    target: "static",
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
    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL || "http://localhost:3000" || "https://map-resellers.netlify.app/",
        mapboxToken: process.env.MAPBOX_TOKEN,
        mapboxStyle: process.env.MAPBOX_STYLE
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
        "@nuxtjs/fontawesome"
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
