/* eslint-disable no-undef,no-unused-expressions */
const {Nuxt, Builder} = require('nuxt')
const chalk = require('chalk')
const path = require('path');
const isDev = think.env === 'development';
const IOredis = require('ioredis');
const redis = new IOredis({
  port: 6379,          // Redis port
  host: isDev ? '127.0.0.1' : '114.55.230.6',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: isDev ? '' : '__2017@picker-redis',
  db: 0
})

module.exports = [
  // {
  //   handle: 'meta',
  //   options: {
  //     logRequest: isDev,
  //     sendResponseTime: isDev
  //   }
  // },
  // {
  //   handle: 'resource',
  //   enable: isDev,
  //   options: {
  //     root: path.join(think.ROOT_PATH, 'www'),
  //     publicPath: /^\/(static|favicon\.ico)/
  //   }
  // },
  // {
  //   handle: 'trace',
  //   enable: !think.isCli,
  //   options: {
  //     contentType (ctx) {
  //       // All request url starts of /api or request header contains `X-Requested-With: XMLHttpRequest` will output json error
  //       const APIRequest = /^\/v*/.test(ctx.request.path);
  //       const AJAXRequest = ctx.is('X-Requested-With', 'XMLHttpRequest');
  //       return APIRequest || AJAXRequest ? 'json' : 'html';
  //     },
  //     // basic set as string, then put 404.html, 500.html into error folder
  //     // templates: path.join(__dirname, 'error'),
  //     // customed set as object
  //     templates: {
  //       404: path.join(__dirname, 'error/404.html'),
  //       500: path.join(__dirname, 'error/500.html'),
  //       502: path.join(__dirname, 'error/502.html')
  //     },
  //     sourceMap: false,
  //     debug: isDev,
  //     error (err, ctx) {
  //       return console.error(err)
  //     }
  //   }
  // },
  {
    handle: 'payload',
    options: {}
  },
  // {
  //   handle: 'router',
  //   options: {
  //     defaultModule: 'api',
  //     defaultController: 'index',
  //     defaultAction: 'index'
  //   }
  // },
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
  // 'controller',


]

