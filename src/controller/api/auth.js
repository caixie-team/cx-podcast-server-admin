const Base = require('../base.js');
const axios = require('axios')
const apiConfig = require(think.ROOT_PATH + '/api.config.js')

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

module.exports = class extends Base {
  async __before () {
    this.org = await this.ctx.session('__org')
  }

  indexAction () {
    return this.display()
  }

  async loginAction () {
    const {data} = await axios.post(`${apiConfig.baseURL}/org/${this.org.id}/signin`, this.post())
    if (data.errno > 0) {
      return this.error(data.errmsg)
    }
    return this.success({token: data.token.value})
  }

  logoutAction () {
    console.log('logout')
  }

  userAction () {
    console.log('user')
  }
};
