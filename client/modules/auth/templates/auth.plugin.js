import './auth.middleware'

import Auth from './auth.class'

export default function (ctx, inject) {
  // Create  new Auth instance
  let _orgId = '/'
  if (process.browser) {
    _orgId += ctx.store.getters.orgId
  }
  if (process.server) {
    _orgId += ctx.req.session.__org.id
  }
  // _orgId = ctx.req.session.__org.id
  const $auth = new Auth(ctx, {
    'fetchUserOnLogin': true,
    'resetOnError': false,
    'rewriteRedirects': true,
    'fullPathRedirect': false,
    'watchLoggedIn': true,
    'namespace': 'auth',
    'scopeKey': 'scope',
    'endpoints': {
      'login': {
        'url': '/org' + _orgId + '/signin',
        'method': 'post',
        'propertyName': 'token'
      },
      'logout': {
        'url': '/org' + _orgId + '/siggout',
        'method': 'post'
      },
      'user': {
        'url': '/org' + _orgId + '/me',
        'method': 'get',
        'propertyName': 'data'
      }
    },
    'redirect': {
      'login': '/login',
      'logout': '/',
      'home': '/posts',
      'callback': '/login'
    },
    'token': {
      'type': 'Bearer',
      'name': 'token'
    },
    'cookie': {
      'name': 'token',
      'options': {
        'path': '/'
      }
    }
  })

  // Prevent infinity redirects
  if ($auth.isAPIRequest) {
    return
  }

  // Inject it to nuxt context as $auth
  inject('auth', $auth)

  // Initialize auth
  return $auth
    .init()
    .catch(process.server ? () => {
    } : console.error)
}
