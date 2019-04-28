import Vue from 'vue'
import Meta from 'vue-meta'
import { createRouter } from './router.js'
import NoSsr from './components/no-ssr.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../client/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_swregister_7df86f0a from 'nuxt_plugin_swregister_7df86f0a' // Source: ./sw.register.js (mode: 'client')
import nuxt_plugin_toast_53e4987e from 'nuxt_plugin_toast_53e4987e' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_axios_09dd6712 from 'nuxt_plugin_axios_09dd6712' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_filters_2b4f519a from 'nuxt_plugin_filters_2b4f519a' // Source: ../client/plugins/filters.js (mode: 'all')
import nuxt_plugin_veevalidate_3f7cf8b3 from 'nuxt_plugin_veevalidate_3f7cf8b3' // Source: ../client/plugins/vee-validate.js (mode: 'all')
import nuxt_plugin_vuejsmodal_26c7eee7 from 'nuxt_plugin_vuejsmodal_26c7eee7' // Source: ../client/plugins/vue-js-modal (mode: 'all')
import nuxt_plugin_axios_54e49ad0 from 'nuxt_plugin_axios_54e49ad0' // Source: ../client/plugins/axios.js (mode: 'all')
import nuxt_plugin_svgicon_71385126 from 'nuxt_plugin_svgicon_71385126' // Source: ../client/plugins/svgicon (mode: 'client')
import nuxt_plugin_vueinfinitescroll_8d6badb0 from 'nuxt_plugin_vueinfinitescroll_8d6badb0' // Source: ../client/plugins/vue-infinite-scroll (mode: 'client')
import nuxt_plugin_plugin_f3294264 from 'nuxt_plugin_plugin_f3294264' // Source: ./auth/plugin.js (mode: 'all')

// Component: <NoSsr>
Vue.component(NoSsr.name, NoSsr)

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    store,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions(transitions) {
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
      error(err) {
        err = err || null
        app.context._errored = !!err
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
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
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) throw new Error('inject(key, value) has no key provided')
    if (typeof value === 'undefined') throw new Error('inject(key, value) has no value provided')
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
          get() {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_swregister_7df86f0a === 'function') {
    await nuxt_plugin_swregister_7df86f0a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_53e4987e === 'function') {
    await nuxt_plugin_toast_53e4987e(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_09dd6712 === 'function') {
    await nuxt_plugin_axios_09dd6712(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_2b4f519a === 'function') {
    await nuxt_plugin_filters_2b4f519a(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_3f7cf8b3 === 'function') {
    await nuxt_plugin_veevalidate_3f7cf8b3(app.context, inject)
  }

  if (typeof nuxt_plugin_vuejsmodal_26c7eee7 === 'function') {
    await nuxt_plugin_vuejsmodal_26c7eee7(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_54e49ad0 === 'function') {
    await nuxt_plugin_axios_54e49ad0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_svgicon_71385126 === 'function') {
    await nuxt_plugin_svgicon_71385126(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueinfinitescroll_8d6badb0 === 'function') {
    await nuxt_plugin_vueinfinitescroll_8d6badb0(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_f3294264 === 'function') {
    await nuxt_plugin_plugin_f3294264(app.context, inject)
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
    store,
    router
  }
}

export { createApp, NuxtError }
