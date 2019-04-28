/**
 * @file App config / Commonjs module
 * @module nuxt.config
 * @author Baisheng <baisheng@caixie.top>
 */
const path = require('path')
const pkg = require('../package')
const apiConfig = require('./api.config')
const {isProdMode, isDevMode} = require('./environment')
// const PATHS = {
//   root: path.resolve(__dirname, '../'),
//   client: path.resolve(__dirname, '../client')
// }
// const API_THIRD = apiConfig.thirdUrl

const PATHS = {
  root: path.resolve(__dirname, '../'),
  client: path.resolve(__dirname, '../client')
}

module.exports = {
  // globalName: 'caixie',
  mode: 'universal',
  dev: isDevMode,
  rootDir: PATHS.root,
  srcDir: PATHS.client,
  // buildDir: 'dist/',
  env: {
    API_HOST: apiConfig.baseURL,
    API_PORT: 8360
    // HOST_URL: apiConfig.socketHost
  },
  serverMiddleware: [
    // '~/middleware/headers.js'
  ],
  // loading: {color: '#fdd32a'},
  loading: '~/components/loading',
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },

  build: {
    analyze: process.argv.join('').includes('analyze'), // 分析
    maxChunkSize: 360000, // 单个包最大尺寸
    extractCSS: true, // 单独提取 css
    // publicPath: apiConfig.cdnUrl + '/_nuxt/',
    postcss: {
      plugins: {'postcss-custom-properties': {warnings: false}}
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          expansions: {
            name: 'expansions',
            test(module) {
              return /swiper|233333|howler|lozad|marked|favico|rtcpeerconnection|webrtc|highlight/.test(module.context);
            },
            chunks: 'initial',
            priority: 10,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          // page -> 合并组件会导致运行异常
          /*
          page: {
            name: 'page',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
            priority: -20
          }
          */
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      /*      if (ctx.isDev && ctx.isClient) {
              config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
              })
            }*/
      if (isProdMode) {
        // 处理 Template 和 CSS 中的 cdn 地址
        // const vueLoader = webpackConfig.module.rules.find(loader => loader.loader === 'vue-loader')
        // if (vueLoader) {
        //   const vueLoaders = vueLoader.options.loaders
        //   for (const cssLoader in vueLoaders) {
        //     if (Array.isArray(vueLoaders[cssLoader])) {
        //       const targetLoader = vueLoaders[cssLoader].find(loader => loader.loader === 'css-loader')
        //       targetLoader && (targetLoader.options.root = apiConfig.cdnUrl)
        //     }
        //   }
      }
    }
  },
  // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
  babel: {
    comments: true,
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-async-to-generator',
    ],
    presets({isServer}) {
      return [
        [
          '@nuxtjs/babel-preset-app',
          {targets: isServer ? {node: '10.4.0'} : {browsers: ["last 2 versions"], chrome: 69}},
          // {targets: isServer ? {node: '10.4.0'} : {chrome: 69}}
        ]
      ]
    },

  },
  plugins: [
    // {src: '~plugins/route.js', ssr: false},
    {src: '~plugins/filters.js'},
    // {src: '~/plugins/moment.js'},
    // {src: '~/plugins/nuxt-client-init.js', ssr: false},
    {src: '~plugins/vee-validate.js'},
    {src: '~plugins/vue-js-modal'},
    {src: '~plugins/axios.js'},
    {src: '~plugins/svgicon', ssr: false},
    {src: '~plugins/vue-infinite-scroll', ssr: false}
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // '~/modules/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/toast'
  ],
  axios: {
    // baseURL: apiConfig.baseURL,
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/api': {
      target: apiConfig.baseURL
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: apiConfig.baseURL + '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: apiConfig.baseURL + '/auth/logout', method: 'post' },
          user: { url: apiConfig.baseURL + '/auth/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },
  head: {
    title: '北京采撷科技',
    // script: [
    //   {
    // src: 'https://18anniversary.obs.cn-east-2.myhwclouds.com/resources/js/create.js'
    // }
    // ],
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: '      width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      // { name: 'viewporte', content: ' width = device-width，initial-scale = 1，maximum-scale = 1，minimum-scale = 1，user-scalable = no' },
      {hid: 'description', name: 'description', content: pkg.description},
      {'http-equiv': 'pragma', content: 'no-cache'},
      {'http-equiv': 'cache-control', content: 'no-cache'},
      {'http-equiv': 'expires', content: '0'},
      {hid: 'keywords', name: 'keywords', content: '小程序,建站'},
      {hid: 'description', name: 'description', content: '愿君多采撷！'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  manifest: {
    // name: appConfig.meta.title,
    // short_name: appConfig.meta.author,
    // theme_color: appConfig.color.primary,
    // background_color: '#eee',
    // description: htmlSlogan,
    // display: 'standalone',
    // lang: htmlLang
  },
  icon: {
    iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152, 192, 384, 512]
  },
  router: {
    middleware: ['auth'],
    // middleware: ['change-page-col'],
    linkActiveClass: 'link-active',
    extendRoutes(routes) {
    },
    scrollBehavior(to, from, savedPosition) {
      return {x: 0, y: 0}
    },
  },
  css: [
    {src: '~assets/sass/main.scss', lang: 'sass'}
  ],
  styleResources: {
    // stylus: [
    // './assets/stylus/variable.styl',
    // './assets/stylus/mixin.styl'
    // ],
    scss: './assets/sass/shared.scss'
  },
}

