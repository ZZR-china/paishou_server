'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const log4js = require('log4js')

const handle = require('./lib/handle')

/* 全局访问 */
global.Conf = require('./conf')
global.log4js = log4js
global.Models = require('./models').t
global.sequelize = require('./models').db
global.Utils = require('./lib/utils')
global.Services = require('./services')
global.Handle = require('./lib/handle')


/* app 实例 */
var app = express()

// 设置日志
var logger = log4js.getLogger("access")

/* 设置路由 */
var routes = require('./conf/routes')

/* 设置模板引擎 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//中间件
app.use(bodyParser.json())
/* 替换真正ip */
app.use((req, res, next) => {
  const ip = Utils.clientIpV4(req)
  Object.defineProperty(req, 'ip', {
      configurable: true,
      enumerable: true,
      get: ()=>{return ip}
  })
  next()
})
app.use(log4js.connectLogger(logger,  {level: 'auto', format: Conf.log.format}))
app.use(routes)


/* 日志处理-开发环境 */
if (app.get('env') != 'development') {
  console.log('本地开发不要使用该日志模式')
  log4js.configure(Conf.log.log4js)
} else {
  log4js.configure(Conf.log.logDev)
}

/* 404 */
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  handle.error(res, '404', 404)
  next(err);
});


module.exports = app
