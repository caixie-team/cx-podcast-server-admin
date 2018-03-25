import 'es6-promise/auto'
import Vue from 'vue'
import Meta from 'vue-meta'
import { createRouter } from './router.js'
import NoSSR from './components/no-ssr.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtLink from './components/nuxt-link.js'
import NuxtError from '../client/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData } from './utils'
import { createStore } from './store.js'

/* Plugins */
import nuxt_plugin_toast_93da30a0 from 'nuxt_plugin_toast_93da30a0' // Source: ./toast.js (ssr: false)
import nuxt_plugin_axios_2c3ac9fe from 'nuxt_plugin_axios_2c3ac9fe' // Source: ./axios.js
import nuxt_plugin_authplugin_6884e725 from 'nuxt_plugin_authplugin_6884e725' // Source: ./auth/auth.plugin.js
import nuxt_plugin_route_17b85036 from 'nuxt_plugin_route_17b85036' // Source: ../client/plugins/route.js (ssr: false)
import nuxt_plugin_filters_2b4f519a from 'nuxt_plugin_filters_2b4f519a' // Source: ../client/plugins/filters.js
import nuxt_plugin_moment_57893d7e from 'nuxt_plugin_moment_57893d7e' // Source: ../client/plugins/moment.js
import nuxt_plugin_nuxtclientinit_3893cbb9 from 'nuxt_plugin_nuxtclientinit_3893cbb9' // Source: ../client/plugins/nuxt-client-init.js (ssr: false)
import nuxt_plugin_veevalidate_3f7cf8b3 from 'nuxt_plugin_veevalidate_3f7cf8b3' // Source: ../client/plugins/vee-validate.js
import nuxt_plugin_vuejsmodal_f50827f4 from 'nuxt_plugin_vuejsmodal_f50827f4' // Source: ../client/plugins/vue-js-modal
import nuxt_plugin_axios_54e49ad0 from 'nuxt_plugin_axios_54e49ad0' // Source: ../client/plugins/axios.js
import nuxt_plugin_svgicon_71385126 from 'nuxt_plugin_svgicon_71385126' // Source: ../client/plugins/svgicon (ssr: false)
import nuxt_plugin_vueinfinitescroll_8d6badb0 from 'nuxt_plugin_vueinfinitescroll_8d6badb0' // Source: ../client/plugins/vue-infinite-scroll (ssr: false)


// Component: <no-ssr>
Vue.component(NoSSR.name, NoSSR)

// Component: <nuxt-child>
Vue.component(NuxtChild.name, NuxtChild)

// Component: <nuxt-link>
Vue.component(NuxtLink.name, NuxtLink)

// Component: <nuxt>`
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = createRouter(ssrContext)

  
  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router
  

  // Create Root instance
  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    store,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },
      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = !!err
        if (typeof err === 'string') err = { statusCode: 500, message: err }
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in lib/server.js
        if (ssrContext) ssrContext.nuxt.error = err
        return err
      }
    },
    ...App
  }
  
  // Make app available into store via this.app
  store.app = app
  
  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    store,
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined
  })

  const inject = function (key, value) {
    if (!key) throw new Error('inject(key, value) has no key provided')
    if (!value) throw new Error('inject(key, value) has no value provided')
    key = '$' + key
    // Add into app
    app[key] = value
    
    // Add into store
    store[key] = app[key]
    
    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) return
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  
  if (process.browser) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }
  

  // Plugin execution
  
  if (typeof nuxt_plugin_axios_2c3ac9fe === 'function') await nuxt_plugin_axios_2c3ac9fe(app.context, inject)
  if (typeof nuxt_plugin_authplugin_6884e725 === 'function') await nuxt_plugin_authplugin_6884e725(app.context, inject)
  if (typeof nuxt_plugin_filters_2b4f519a === 'function') await nuxt_plugin_filters_2b4f519a(app.context, inject)
  if (typeof nuxt_plugin_moment_57893d7e === 'function') await nuxt_plugin_moment_57893d7e(app.context, inject)
  if (typeof nuxt_plugin_veevalidate_3f7cf8b3 === 'function') await nuxt_plugin_veevalidate_3f7cf8b3(app.context, inject)
  if (typeof nuxt_plugin_vuejsmodal_f50827f4 === 'function') await nuxt_plugin_vuejsmodal_f50827f4(app.context, inject)
  if (typeof nuxt_plugin_axios_54e49ad0 === 'function') await nuxt_plugin_axios_54e49ad0(app.context, inject)
  
  if (process.browser) { 
    if (typeof nuxt_plugin_toast_93da30a0 === 'function') await nuxt_plugin_toast_93da30a0(app.context, inject)
    if (typeof nuxt_plugin_route_17b85036 === 'function') await nuxt_plugin_route_17b85036(app.context, inject)
    if (typeof nuxt_plugin_nuxtclientinit_3893cbb9 === 'function') await nuxt_plugin_nuxtclientinit_3893cbb9(app.context, inject)
    if (typeof nuxt_plugin_svgicon_71385126 === 'function') await nuxt_plugin_svgicon_71385126(app.context, inject)
    if (typeof nuxt_plugin_vueinfinitescroll_8d6badb0 === 'function') await nuxt_plugin_vueinfinitescroll_8d6badb0(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router,
    store
  }
}

export { createApp, NuxtError }
