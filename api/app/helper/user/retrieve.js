'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('user-retrieve')

const { User } = Models

const cache = Services.cache
const sms = Services.sms
const template = Conf.sms.tpl
const verifyPwd = Conf.user.password.verify
const transformPwd = Conf.user.password.transform


exports.getSmscode = (req, res) => {
  lightco.run(function *($) {
    const mobile = req.body.mobile
    const SMS_EXPIRE = Conf.sms.expire
    const SMS_MAX = Conf.sms.max

    try {
        var [err, user] = yield User.findOne({where: {'user': mobile}})
        if (err) throw err

        if (!user) {
            return Handle.error(res, '1008', 400)
        }

        var [err, count] = yield cache.hget(`RET_${mobile}`, 'sms_count', $)
        if (err) throw err

        count = Utils.toInt(count)

        // if (count >= SMS_MAX) {
        //     return Handle.error(res, '1001', 400)
        // }

        const code = 8888
        var body = {
            code: 1
        }

        // const code = Utils.rand4()
        // const content = template.retrieve(code)
        //
        // var [err, body] = yield sms.send('yzm', mobile, content, $)
        // if (err) throw err

        if (body && body.code == 1) {
          var [err] = yield cache.hset(`RET_${mobile}`, 'sms_code', code, SMS_EXPIRE, $)
          if (err) throw err

          var [err] = yield cache.hset(`RET_${mobile}`, 'sms_count', count + 1, $)
          if (err) throw err

          return Handle.success(res, 0)
        }

        return Handle.error(res, '1002', 400)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}

exports.verifySmscode = (req, res) => {
  lightco.run(function*($) {
    const mobile = req.body.mobile
    const smsCode = req.body.sms_code
    const SMS_EXPIRE = Conf.sms.expire

    try {
        if (!smsCode) {
            return Handle.error(res, '1004', 400)
        }

        var [err, code] = yield cache.hget(`RET_${mobile}`, 'sms_code', $)
        if (err) throw err

        if (code != smsCode) {
            return Handle.error(res, '1004', 400)
        }

        var [err] = yield cache.hdel(`RET_${mobile}`, 'sms_code', $)
        if (err) throw err

        const token = Utils.uuid()

        var [err] = yield cache.hset(`RET_${mobile}`, 'token', token, SMS_EXPIRE, $)
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
    const _token = req.body.tem_token
    const password = req.body.password

    try {
        var [err, user] = yield User.findOne({where: {'user': mobile}})
        if (err) throw err

        if (!user) {
            return Handle.error(res, '1008', 400)
        }

        if (!_token) {
            return Handle.error(res, '1005', 400)
        }

        var [err, token] = yield cache.hget(`RET_${mobile}`, 'token', $)
        if (err) throw err

        if (_token != token) {
            return Handle.error(res, '1006', 400)
        }

        var [err] = yield cache.hdel(`RET_${mobile}`, 'token', $)
        if (err) throw err

        user.password = transformPwd(password)

        var [err] = yield user.save()
        if (err) throw err

        var [err, jwt] = yield Services.token.encode(user, $)
        if (err) throw err

        const json = {
            token: jwt
        }

        return Handle.success(res, json)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}
