'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('user-bindMobile')

const { Users } = Models

const cache = Services.cache
const sms = Services.sms
const template = Conf.sms.tpl
const transformPwd = Conf.user.password.transform


exports.getSmscode = (req, res) => {
    lightco.run(function *($) {
        const mobile = req.body.mobile
        const SMS_EXPIRE = Conf.sms.expire
        const SMS_MAX = Conf.sms.max

        try {
            var [err, count] = yield cache.hget(`WX_${mobile}`, 'sms_count', $)
            if (err) throw err

            count = Utils.toInt(count)

            // if (count >= SMS_MAX) {
            //     return Handle.error(res, '1001', 403)
            // }

            const code = 8888
            var body = {
                code: 1
            }

            // const code = Utils.rand4()
            // const content = template.bind(code)
            //
            // var [err, body] = yield sms.send('yzm', mobile, content, $)
            // if (err) throw err

            if (body && body.code == 1) {
              var [err] = yield cache.hset(`WX_${mobile}`, 'sms_code', code, SMS_EXPIRE, $)
              if (err) throw err

              var [err] = yield cache.hset(`WX_${mobile}`, 'sms_count', count + 1, $)
              if (err) throw err

              return Handle.success(res, 0)
            }

            return Handle.error(res, '1002', 403)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

exports.verifySmscode = (req, res) => {
    lightco.run(function*($) {
        const mobile = req.body.mobile
        const smsCode = req.body.smsCode
        const SMS_EXPIRE = Conf.sms.expire
        const user = req.user

        try {
            if (!smsCode) {
                return Handle.error(res, '1004', 400)
            }

            var [err, code] = yield cache.hget(`WX_${mobile}`, 'sms_code', $)
            if (err) throw err

            if (code != smsCode) {
                return Handle.error(res, '1004', 400)
            }

            var [err] = yield cache.hdel(`WX_${mobile}`, 'sms_code', $)
            if (err) throw err

            const token = Utils.uuid()

            var [err] = yield cache.hset(`WX_${mobile}`, 'token', token, SMS_EXPIRE, $)
            if (err) throw err

            const json = {
                temToken: token
            }

            return Handle.success(res, json)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

exports.setPassword = (req, res) => {
  lightco.run(function*($) {
    const mobile = req.body.mobile
    const _token = req.body.temToken
    const password = req.body.password
    const user = req.user

    try {
        if (!_token) {
            return Handle.error(res, '1005', 400)
        }

        var [err, token] = yield cache.hget(`WX_${mobile}`, 'token', $)
        if (err) throw err

        if (_token != token) {
            return Handle.error(res, '1007', 400)
        }

        var [err] = yield cache.hdel(`WX_${mobile}`, 'token', $)
        if (err) throw err

        user.user = mobile
        user.password = pwd_transform(password)

        var [err] = yield user.save()
        if (err) throw err

        return Handle.success(res, 0)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}
