import Vue from 'vue'
import NuxtLoading from '~/components/loading'

import '../client/assets/sass/main.scss'

import _2d216b68 from '../client/layouts/apps.vue'
import _6f6c098b from '../client/layouts/default.vue'
import _77430317 from '../client/layouts/empty.vue'
import _43cc18f9 from '../client/layouts/logged-out.vue'
import _5064f167 from '../client/layouts/masterbar/item.vue'
import _5881177c from '../client/layouts/masterbar/logged-in.vue'
import _90bc2052 from '../client/layouts/masterbar/logged-out.vue'
import _611406c6 from '../client/layouts/masterbar/masterbar.vue'
import _354a7d84 from '../client/layouts/post-editor.vue'

const layouts = { "_apps": _2d216b68,"_default": _6f6c098b,"_empty": _77430317,"_logged-out": _43cc18f9,"_masterbar/item": _5064f167,"_masterbar/logged-in": _5881177c,"_masterbar/logged-out": _90bc2052,"_masterbar/masterbar": _611406c6,"_post-editor": _354a7d84 }

export default {
  head: {"title":"北京采撷科技","meta":[{"charset":"utf-8"},{"name":"viewport","content":"      width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{"hid":"description","name":"description","content":"caixie.top"},{"http-equiv":"pragma","content":"no-cache"},{"http-equiv":"cache-control","content":"no-cache"},{"http-equiv":"expires","content":"0"},{"hid":"keywords","name":"keywords","content":"小程序,建站"},{"hid":"description","name":"description","content":"愿君多采撷！"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"caixie-app"},{"hid":"author","name":"author","content":"baisheng@gmail.com"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"caixie-app"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"caixie-app"},{"hid":"og:description","name":"og:description","property":"og:description","content":"caixie.top"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002Fundefined\u002F_nuxt\u002Fmanifest.0756c1c8.json"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
