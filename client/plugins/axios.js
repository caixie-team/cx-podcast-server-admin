/* eslint-disable radix,dot-notation */
export default function ({$axios, app, redirect}) {
  // Set to all requests
  $axios.onRequest(config => {
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Authorization'] = `Bearer ${app.$auth.token}`;
    config.headers['Authorization'] = `${app.$auth.getToken('local')}`;
    console.log('Making request to ' + config.url);
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
