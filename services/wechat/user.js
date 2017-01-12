'use strict'

const request = require('request')
const logger = log4js.getLogger('[services-wechat-user]')
const url = Conf.wechat.url

const app = Conf.wechat.ssb.app

const user = {
	info: info,
}

//微信认证后获取的参数
function info(access_token, openid, cb) {
	const params = {
		access_token: access_token,
        openid: openid,
	}
	const opts = {
		url: url.user.info,
		qs: params,
		json: true
	}
	request.get(opts, function(err, res, body){
		if (err) cb(err, body)

		cb(null, body)
	})
}


module.exports = user
