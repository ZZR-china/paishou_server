'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('user-retrieve')

const { User } = Models

const cache = Services.cache
const sms = Services.sms
const template = Conf.sms.tpl
const verify_fmt = Conf.user.password.verify_fmt
const pwd_transform = Conf.user.password.transform


exports.get_smscode = (req, res) => {
  lightco.run(function *($) {
    const mobile = req.body.mobile
    const expire = Conf.sms.expire
    const max = Conf.sms.max

    try {
        var [err, user] = yield User.findOne({where: {'user': mobile}})
        if (err) throw err

        if (!user)  return Handle.error(res, '1008', 400)

        var [err, count] = yield cache.hget(`RET_${mobile}`, 'sms_count', $)
        if (err) throw err

        count = Utils.toInt(count)
        if (count >= max)  return Handle.error(res, '1001', 400)

        const code = Utils.rand4()
        const content = template.retrieve(code)

        var [err, body] = yield sms.send('yzm', mobile, content, $)
        if (err) throw err

        if (body && body.code == 1 && body.result) {
          var [err] = yield cache.hset(`RET_${mobile}`, 'sms_code', code, expire, $)
          if (err) throw err

          var [err] = yield cache.hset(`RET_${mobile}`, 'sms_count', count + 1, $)
          if (err) throw err

          const json = {
            smscode: code
          }

          return Handle.success(res, json)
        }

        return Handle.error(res, '1002', 400)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}

exports.verify_smscode = (req, res) => {
  lightco.run(function*($) {
    const mobile = req.body.mobile
    const smscode = req.body.smscode
    const expire = Conf.sms.expire

    try {
        if (!smscode)
            return Handle.error(res, '1004', 400)

        var [err, code] = yield cache.hget(`RET_${mobile}`, 'sms_code', $)
        if (err) throw err

        if (code != smscode)
          return Handle.error(res, '1004', 400)

        var [err] = yield cache.hdel(`RET_${mobile}`, 'sms_code', $)
        if (err) throw err

        const token = Utils.uuid()

        var [err] = yield cache.hset(`RET_${mobile}`, 'token', token, expire, $)
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

exports.set_password = (req, res) => {
  lightco.run(function*($) {
    const mobile = req.body.mobile
    const _token = req.body.temToken
    const password = req.body.password

    try {
        if (!password)
          return Handle.error(res, '1030', 400)

        var [err, user] = yield User.findOne({where: {'user': mobile}})
        if (err) throw err

        if (!user)  return Handle.error(res, '1008', 400)

        if (!_token)  return Handle.error(res, '1005', 400)

        if (!verify_fmt(password))
          return Handle.error(res, '1007', 400)

        var [err, token] = yield cache.hget(`RET_${mobile}`, 'token', $)
        if (err) throw err

        if (_token != token)
          return Handle.error(res, '1006', 400)

        var [err] = yield cache.hdel(`RET_${mobile}`, 'token', $)
        if (err) throw err

        user.password = pwd_transform(password)

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
