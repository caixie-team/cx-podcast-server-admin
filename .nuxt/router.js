import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _6a5277b4 = () => interopDefault(import('../client/pages/apps.vue' /* webpackChunkName: "pages/apps" */))
const _6734f013 = () => interopDefault(import('../client/pages/home.vue' /* webpackChunkName: "pages/home" */))
const _1eb37fa8 = () => interopDefault(import('../client/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _7887827a = () => interopDefault(import('../client/pages/people.vue' /* webpackChunkName: "pages/people" */))
const _2a439f57 = () => interopDefault(import('../client/pages/people/new/index.vue' /* webpackChunkName: "pages/people/new/index" */))
const _fb54439e = () => interopDefault(import('../client/pages/people/edit/_id.vue' /* webpackChunkName: "pages/people/edit/_id" */))
const _35788acd = () => interopDefault(import('../client/pages/people/_type.vue' /* webpackChunkName: "pages/people/_type" */))
const _7c36404f = () => interopDefault(import('../client/pages/posts.vue' /* webpackChunkName: "pages/posts" */))
const _0d977356 = () => interopDefault(import('../client/pages/posts/settings/index.vue' /* webpackChunkName: "pages/posts/settings/index" */))
const _a8aada22 = () => interopDefault(import('../client/pages/posts/settings/general/index.vue' /* webpackChunkName: "pages/posts/settings/general/index" */))
const _5460d251 = () => interopDefault(import('../client/pages/posts/_status.vue' /* webpackChunkName: "pages/posts/_status" */))
const _76c45a89 = () => interopDefault(import('../client/pages/posts/_term/_slug/index.vue' /* webpackChunkName: "pages/posts/_term/_slug/index" */))
const _0ea7f152 = () => interopDefault(import('../client/pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _936de79a = () => interopDefault(import('../client/pages/settings/general/index.vue' /* webpackChunkName: "pages/settings/general/index" */))
const _ee7652b0 = () => interopDefault(import('../client/pages/settings/taxonomies/_category/index.vue' /* webpackChunkName: "pages/settings/taxonomies/_category/index" */))
const _3fd52e46 = () => interopDefault(import('../client/pages/test.vue' /* webpackChunkName: "pages/test" */))
const _3b4259ce = () => interopDefault(import('../client/pages/post/assets.vue' /* webpackChunkName: "pages/post/assets" */))
const _d53b0cf4 = () => interopDefault(import('../client/pages/post/default.vue' /* webpackChunkName: "pages/post/default" */))
const _1e514eff = () => interopDefault(import('../client/pages/post/_id.vue' /* webpackChunkName: "pages/post/_id" */))
const _58b35464 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _3d26a9d4 = () => interopDefault(import('../client/pages/_app.vue' /* webpackChunkName: "pages/_app" */))

Vue.use(Router)

const scrollBehavior = function(to, from, savedPosition) {
      return {x: 0, y: 0}
    }

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/apps",
      component: _6a5277b4,
      name: "apps"
    }, {
      path: "/home",
      component: _6734f013,
      name: "home"
    }, {
      path: "/login",
      component: _1eb37fa8,
      name: "login"
    }, {
      path: "/people",
      component: _7887827a,
      name: "people",
      children: [{
        path: "new",
        component: _2a439f57,
        name: "people-new"
      }, {
        path: "edit/:id?",
        component: _fb54439e,
        name: "people-edit-id"
      }, {
        path: ":type",
        component: _35788acd,
        name: "people-type"
      }]
    }, {
      path: "/posts",
      component: _7c36404f,
      name: "posts",
      children: [{
        path: "settings",
        component: _0d977356,
        name: "posts-settings"
      }, {
        path: "settings/general",
        component: _a8aada22,
        name: "posts-settings-general"
      }, {
        path: ":status",
        component: _5460d251,
        name: "posts-status"
      }, {
        path: ":term/:slug",
        component: _76c45a89,
        name: "posts-term-slug"
      }]
    }, {
      path: "/settings",
      component: _0ea7f152,
      name: "settings",
      children: [{
        path: "general",
        component: _936de79a,
        name: "settings-general"
      }, {
        path: "taxonomies/:category",
        component: _ee7652b0,
        name: "settings-taxonomies-category"
      }]
    }, {
      path: "/test",
      component: _3fd52e46,
      name: "test"
    }, {
      path: "/post/assets",
      component: _3b4259ce,
      name: "post-assets"
    }, {
      path: "/post/default",
      component: _d53b0cf4,
      name: "post-default"
    }, {
      path: "/post/:id?",
      component: _1e514eff,
      name: "post-id"
    }, {
      path: "/",
      component: _58b35464,
      name: "index"
    }, {
      path: "/:app",
      component: _3d26a9d4,
      name: "app"
    }],

    fallback: false
  })
}
