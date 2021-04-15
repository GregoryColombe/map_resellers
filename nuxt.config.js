export default {
  target: 'static',
  head: {
    title: 'Abvent | Carte Revendeurs',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  css: [],
  plugins: [
    "~/plugins/extensions.client.js"
  ],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL
  },
  build: {
    // publicPath: '/',
    // extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // }
  }
}
