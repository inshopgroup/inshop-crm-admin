import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - v2',
    title: 'v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/layout',
    '~/plugins/formComponents',
    '~/plugins/dayjs',
    '~/plugins/dot',
    '~/plugins/mixins',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            iso: 'en_US',
            name: 'English',
            file: 'en.js',
          },
        ],
        lazy: true,
        langDir: 'lang/',
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    debug: false,
    proxy: true,
  },

  proxy: {
    '/api/proxy': {
      target: process.env.NUXT_ENV_API_PROXY_URL,
      pathRewrite: { '/api/proxy': '' },
      changeOrigin: true,
      headers: {
        Connection: 'keep-alive',
      },
      onProxyReq: function log(proxyReq, req, res) {
        //  console.log(req.body)
        // console.log(proxyReq.getHeader('Content-Type'))

        if (!req.body || !Object.keys(req.body).length) {
          return
        }

        const contentType = proxyReq.getHeader('Content-Type')
        const writeBody = (bodyData) => {
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
          proxyReq.write(bodyData)
        }
        if (
          contentType.includes('application/json') ||
          contentType.includes('application/x-www-form-urlencoded')
        ) {
          writeBody(JSON.stringify(req.body))
        }
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    icons: 'mdi',
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js',
    defaultAssets: {
      font: {
        family: 'Source Sans Pro',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: {
      analyzerMode: 'static',
    },
  },
}
