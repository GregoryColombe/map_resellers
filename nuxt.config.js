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
        baseURL: process.env.BASE_URL || "http://localhost:3000"
    },
    privateRuntimeConfig: {

    },
    css: [
        "~/assets/style/style.scss"
    ],
    plugins: [
        "~/plugins/extensions.client.js"
    ],
    components: true,
    buildModules: [
        "@nuxtjs/eslint-module"
    ],
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/dotenv"
    ],
    axios: {
        baseURL: process.env.BASE_URL
    },
    build: {}
}
