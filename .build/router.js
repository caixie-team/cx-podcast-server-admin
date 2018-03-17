import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _3669d52a = () => import('../client/pages/test.vue' /* webpackChunkName: "pages/test" */).then(m => m.default || m)
const _583675eb = () => import('../client/pages/posts.vue' /* webpackChunkName: "pages/posts" */).then(m => m.default || m)
const _5969d23a = () => import('../client/pages/posts/settings/index.vue' /* webpackChunkName: "pages/posts/settings/index" */).then(m => m.default || m)
const _3331cdd3 = () => import('../client/pages/posts/settings/general/index.vue' /* webpackChunkName: "pages/posts/settings/general/index" */).then(m => m.default || m)
const _95e0a826 = () => import('../client/pages/posts/_status.vue' /* webpackChunkName: "pages/posts/_status" */).then(m => m.default || m)
const _26563db6 = () => import('../client/pages/posts/_term/_slug/index.vue' /* webpackChunkName: "pages/posts/_term/_slug/index" */).then(m => m.default || m)
const _67c2bca7 = () => import('../client/pages/people.vue' /* webpackChunkName: "pages/people" */).then(m => m.default || m)
const _45c1103b = () => import('../client/pages/people/new/index.vue' /* webpackChunkName: "pages/people/new/index" */).then(m => m.default || m)
const _760be49e = () => import('../client/pages/people/_type.vue' /* webpackChunkName: "pages/people/_type" */).then(m => m.default || m)
const _7d2929ec = () => import('../client/pages/apps.vue' /* webpackChunkName: "pages/apps" */).then(m => m.default || m)
const _5dc996f7 = () => import('../client/pages/home.vue' /* webpackChunkName: "pages/home" */).then(m => m.default || m)
const _3d77df78 = () => import('../client/pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _95eac78a = () => import('../client/pages/settings.vue' /* webpackChunkName: "pages/settings" */).then(m => m.default || m)
const _56ff4217 = () => import('../client/pages/settings/general/index.vue' /* webpackChunkName: "pages/settings/general/index" */).then(m => m.default || m)
const _54145344 = () => import('../client/pages/settings/taxonomies/_category/index.vue' /* webpackChunkName: "pages/settings/taxonomies/_category/index" */).then(m => m.default || m)
const _4aa0383a = () => import('../client/pages/post/_id.vue' /* webpackChunkName: "pages/post/_id" */).then(m => m.default || m)
const _a0b2e92c = () => import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _4ffd5c0c = () => import('../client/pages/_app.vue' /* webpackChunkName: "pages/_app" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'selected is-active',
    linkExactActiveClass: 'is-selected',
    scrollBehavior,
    routes: [
		{
			path: "/test",
			component: _3669d52a,
			name: "test"
		},
		{
			path: "/posts",
			component: _583675eb,
			name: "posts",
			children: [
				{
					path: "settings",
					component: _5969d23a,
					name: "posts-settings"
				},
				{
					path: "settings/general",
					component: _3331cdd3,
					name: "posts-settings-general"
				},
				{
					path: ":status",
					component: _95e0a826,
					name: "posts-status"
				},
				{
					path: ":term/:slug",
					component: _26563db6,
					name: "posts-term-slug"
				}
			]
		},
		{
			path: "/people",
			component: _67c2bca7,
			name: "people",
			children: [
				{
					path: "new",
					component: _45c1103b,
					name: "people-new"
				},
				{
					path: ":type",
					component: _760be49e,
					name: "people-type"
				}
			]
		},
		{
			path: "/apps",
			component: _7d2929ec,
			name: "apps"
		},
		{
			path: "/home",
			component: _5dc996f7,
			name: "home"
		},
		{
			path: "/login",
			component: _3d77df78,
			name: "login"
		},
		{
			path: "/settings",
			component: _95eac78a,
			name: "settings",
			children: [
				{
					path: "general",
					component: _56ff4217,
					name: "settings-general"
				},
				{
					path: "taxonomies/:category",
					component: _54145344,
					name: "settings-taxonomies-category"
				}
			]
		},
		{
			path: "/post/:id?",
			component: _4aa0383a,
			name: "post-id"
		},
		{
			path: "/",
			component: _a0b2e92c,
			name: "index"
		},
		{
			path: "/:app",
			component: _4ffd5c0c,
			name: "app"
		}
    ],
    
    
    fallback: false
  })
}
