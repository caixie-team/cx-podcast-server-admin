import Auth from './auth'

import './middleware'

// Active chemes
import scheme_003d9a64 from './schemes/local.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/","home":"/","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Inject it to nuxt context as $auth
  inject('auth', $auth)

  // Register strategies

  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"http://127.0.0.1:5000/auth/login","method":"post","propertyName":"token"},"logout":{"url":"http://127.0.0.1:5000/auth/logout","method":"post"},"user":{"url":"http://127.0.0.1:5000/auth/user","method":"get","propertyName":"user"}},"_name":"local"}))

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.browser) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
