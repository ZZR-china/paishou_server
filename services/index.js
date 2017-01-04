'use strict'

var services = {}

services.sms = require('./sms')
services.cache = require('./cache')
services.token = require('./token')
services.wechat = require('./wechat')


module.exports = services
