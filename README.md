
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## 补充
如果希望某些 controller 如 api 不被 nuxt 中间件拦截，请参考下面的代码修改 middleware
```javascript
module.exports = options => {
  let err = null
  const middleware = async (ctx, next) => {
    // 处理不被拦截的路径
    let subdomain = ctx.url.split('/')[1]
    if (subdomain === 'api') {
      return next()
    } else {
      // let isApi
      // 默认访问状态为 404
      ctx.status = 200
      ctx.req.session = await ctx.session()
      await nuxt.render(ctx.req, ctx.res)
      const startTime = Date.now();
      return next().catch(e => {
        err = e
      }).then(() => {
          const endTime = Date.now();
          // nuxt.render(ctx.req, ctx.res)
          if (err) return Promise.reject(err); // 如果后续执行逻辑有错误，则将错误返回
          return new Promise((resolve, reject) => {
            // console.log(`request exec time: ${endTime - startTime}ms`);
          })
        }
      )
    }
  }
  return middleware
}
```
