'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('routes-user')

const user = {}

user.register = require('./register')
user.retrieve = require('./retrieve')
user.thirdparty = require('./thirdparty')


const { User } = Models
const cache = Services.cache
const pwd_transform = Conf.user.password.transform

user.verify_token = (req, res) => {
  return Handle.success(res, 0)
}

//登录
user.login = (req, res) => {
  lightco.run(function *($) {
    const mobile = req.body.mobile
    const password = req.body.password

    const expire = Conf.user.try.expire
    const max = Conf.user.try.max

    try {
        if (!mobile || !password)
          return Handle.error(res, '1011', 400)

        var [err, count] = yield cache.hget(`LOGIN_${mobile}`, 'try_count', $)
        if (err) throw err

        // 频繁错误登陆
        count = Utils.toInt(count)
        if (count >= max)
          return Handle.error(res, '1025', 403)

        var [err, user] = yield User.findOne({where: {'user': mobile}})
        if (err) throw err

        if (!user)
          return Handle.error(res, '1008', 403)

        const md5 = pwd_transform(password)

        // 密码错误
        if (md5 != user.password) {
          var [err] = yield cache.hset(`LOGIN_${mobile}`, 'try_count', count + 1, expire, $)
          if (err) throw err

          return Handle.error(res, '1011', 403)
        }

        // 生成token
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

//登出
user.logout = (req, res) => {
  lightco.run(function *($) {
    try {
      const user = req.user
      var [err] = yield Services.token.del(user, $)
      if (err) throw err

      return Handle.success(res, 0)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}

//修改密码
user.revise = (req, res) => {
  lightco.run(function *($) {
    const user = req.user
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    try {
      const password = user.password

      if (!oldPassword || !newPassword)
        return Handle.error(res, '1030', 400)

      if (password !== pwd_transform(oldPassword))
        return Handle.error(res, '1029', 400)

      user.password = pwd_transform(newPassword)

      var [err] = yield user.save()
      if (err) throw err

      return Handle.success(res, 0)

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}

user.checkPhone = (req, res, next) => {
  const mobile = req.body.mobile

  if (!mobile || !Utils.checkPhone(mobile))
    return Handle.error(res, '1003', 400)

  next()
}

module.exports = user
