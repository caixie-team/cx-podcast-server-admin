## Podcast App manager

Application created by [ThinkJS](http://www.thinkjs.org) And [Nuxt.js](https://github.com/nuxt)

应用如果要正常使用，需要安装 Podcast 服务端，[podcast-server](https://github.com/baisheng/podcast-server).

## Screenshot
### Login
![](https://github.com/baisheng/podcast-app-manager/blob/master/doc/screenshot/login.png?raw=true)

### Home

![](https://github.com/baisheng/podcast-app-manager/blob/master/doc/screenshot/homepage.png?raw=true)

### Detail

![](https://github.com/baisheng/podcast-app-manager/blob/master/doc/screenshot/detail.png?raw=true)

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

