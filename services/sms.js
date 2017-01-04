'use strict'

const request = require('request')
const qs = require('querystring')
const logger = log4js.getLogger('[services-sms]')

const exp = {}

/*
type: 发送类型
mobile 号码
content 内容
*/
exp.send = (type, mobile, content, cb) => {
    const url = Conf.sms[type]
    if (!url) {
        var error = new Error('非法短信类型')
        logger.fatal(error.toString())
        return cb(error)
    }

    const body = {
        apikey: Conf.sms.apikey,
        mobile: mobile,
        content: content
    }

    const opts = {
        method: 'POST',
        url: url,
        form: qs.stringify(body),
        timeout: Conf.sms.timeout,
        json: true
    }

    logger.info(`向号码 ${mobile} 发送验证码 类型: ${type}`)

    request(opts, (error, response, body) => {
        if (error)
            logger.fatal('短信发送失败:', error.toString())
        return cb(error, body)
    })
}

module.exports = exp
