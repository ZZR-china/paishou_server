
var conf = {}

conf.db = require('./db')
conf.log = require('./log')
conf.sms = require('./sms')
conf.user = require('./user')
conf.wechat = require('./wechat')


module.exports = conf
