import Vue from 'vue'
import NuxtLoading from '~/components/loading'

import '../client/assets/scss/main.scss'


let layouts = {

  "_apps": () => import('../client/layouts/apps.vue'  /* webpackChunkName: "layouts/apps" */).then(m => m.default || m),

  "_default": () => import('../client/layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m),

  "_empty": () => import('../client/layouts/empty.vue'  /* webpackChunkName: "layouts/empty" */).then(m => m.default || m),

  "_logged-out": () => import('../client/layouts/logged-out.vue'  /* webpackChunkName: "layouts/logged-out" */).then(m => m.default || m),

  "_masterbar/item": () => import('../client/layouts/masterbar/item.vue'  /* webpackChunkName: "layouts/masterbar/item" */).then(m => m.default || m),

  "_masterbar/logged-in": () => import('../client/layouts/masterbar/logged-in.vue'  /* webpackChunkName: "layouts/masterbar/logged-in" */).then(m => m.default || m),

  "_masterbar/logged-out": () => import('../client/layouts/masterbar/logged-out.vue'  /* webpackChunkName: "layouts/masterbar/logged-out" */).then(m => m.default || m),

  "_masterbar/masterbar": () => import('../client/layouts/masterbar/masterbar.vue'  /* webpackChunkName: "layouts/masterbar/masterbar" */).then(m => m.default || m),

  "_post-editor": () => import('../client/layouts/post-editor.vue'  /* webpackChunkName: "layouts/post-editor" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"北京采撷科技","titleTemplate":"%s | 北京采撷科技","meta":[{"charset":"utf-8"},{"http-equiv":"cleartype","content":"on"},{"name":"author","content":"hello@caixie.top"},{"name":"MobileOptimized","content":"320"},{"name":"HandheldFriendly","content":"True"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, user-scalable=no"},{"hid":"keywords","name":"keywords","content":"小程序,建站"},{"hid":"description","name":"description","content":"愿君多采撷！"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"script":[{}],"noscript":[{"innerHTML":"This website requires JavaScript."}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
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
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

