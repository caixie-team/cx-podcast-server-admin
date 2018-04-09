/* eslint-disable no-undef,no-unused-expressions */
// const {Nuxt, Builder} = require('nuxt')
const chalk = require('chalk')
const path = require('path');
const isDev = think.env === 'development';
const IOredis = require('ioredis');
const nuxt = require('../middleware/nuxt')
const redis = new IOredis({
  port: isDev ? 6379 : 6377,          // Redis port
  host: isDev ? '127.0.0.1' : '114.55.230.6',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  // password: isDev ? '' : '__2017@picker-redis',
  password: isDev ? '' : '__@caixie-redis_v2',
  db: 0
})

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  // {
  //   handle: 'resource',
  //   enable: true,
  //   options: {
  //     root: path.join(think.ROOT_PATH, 'www', '.build'),
  //     publicPath: /^\/(static|favicon\.ico)/
  //   }
  // },
  {
    handle: 'trace',
    enable: !think.isCli
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: (options, app) => {
      return async (ctx, next) => {
        const ORG = await ctx.session('__org');
        if (!think.isEmpty(ORG)) {
          await next()
        } else {
          let org = await redis.get(ctx.host)
          if (org !== null) {
            org = JSON.parse(org)
            await ctx.session('__org', org);
          } else {
            let err = new Error(`🙈 机构不存在!`);
            err.status = 403;
            // ctx.body = err
            throw err;
          }
          await next()
        }
      }
    }
  },
  {
    handle: 'nuxt',
    options: {}
  }
  // 'logic',
  // 'controller'
]

