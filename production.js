const Application = require('thinkjs');
process.env.NODE_ENV = 'production'

const instance = new Application({
  ROOT_PATH: __dirname,
  // proxy: true, // use proxy
  env: 'production'
});
instance.run();
