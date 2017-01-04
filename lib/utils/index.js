'use script'

const util = require('util')
const uuid = require('node-uuid');

var utils = {}

/* x-real-ip 由nginx转发时添加 */
utils.clientIpV4 = function(req) {
  const ip = req.headers['x-real-ip'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress
	return ip.split(':').pop()
}

/* 判断手机号 */
utils.checkPhone = function(phone) {
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone)))
        return false
	return true
}

/* 4位随机数字 */
utils.rand4 = function() {
	return util.format('%d0000', Math.floor(Math.random() * 9999)).substr(0, 4)
}

/* uuid */
utils.uuid = function() {
	return uuid.v4()
}

/*
安全的将一个字符串数字 转为int
def 为当转换失败时，赋值的默认值
 */
utils.toInt = function(v, def) {
  const n = parseInt(v)
	return isNaN(n) ? (def || 0) : n
}

module.exports = utils
