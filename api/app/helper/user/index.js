'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('routes-user')

const user = {}

user.register = require('./register')
user.retrieve = require('./retrieve')
user.thirdparty = require('./thirdparty')
user.bindMobile = require('./bindMobile')
user.bindWechat = require('./bindWechat')


const { Users } = Models
const cache = Services.cache
const _verifyPwd = Conf.user.password.verify
const transformPwd = Conf.user.password.transform

// user.verifyToken = (req, res) => {
//     return Handle.success(res, 0)
// }

user.info = (req, res) => {
    lightco.run(function *($) {
        try {
            const user = req.user

            const json = {
                mobile: user.mobile,
                realName: user.realName,
                nikeName: user.nikeName,
                idCard: user.idCard,
                passportId: user.passportId,
                oneWayPermit: user.oneWayPermit,
                point: user.point,
            }

            return Handle.success(res, json)
        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//登录
user.login = (req, res) => {
    lightco.run(function *($) {
        const mobile = req.body.mobile
        const password = req.body.password

        const USER_TRY_EXPIRE = Conf.user.try.expire
        const USER_TRY_MAX = Conf.user.try.max

        try {
            if (!mobile || !password) {
                return Handle.error(res, '1011', 400)
            }

            var [err, count] = yield cache.hget(`LOGIN_${mobile}`, 'try_count', $)
            if (err) throw err

            // 频繁错误登陆
            count = Utils.toInt(count)
            if (count >= USER_TRY_MAX) {
                return Handle.error(res, '1025', 403)
            }


            var [err, user] = yield Users.findOne({where: {'user': mobile}})
            if (err) throw err

            if (!user) {
                return Handle.error(res, '1008', 403)
            }


            const md5 = transformPwd(password)

            // 密码错误
            if (md5 != user.password) {
              var [err] = yield cache.hset(`LOGIN_${mobile}`, 'try_count', count + 1, USER_TRY_EXPIRE, $)
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

          if (!oldPassword || !newPassword) {
              return Handle.error(res, '1030', 400)
          }

          if (password !== transformPwd(oldPassword)) {
              return Handle.error(res, '1029', 400)
          }

          user.password = transformPwd(newPassword)

          var [err] = yield user.save()
          if (err) throw err

          return Handle.success(res, 0)

        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}

//校验手机号
user.checkPhone = (req, res, next) => {
    const mobile = req.body.mobile

    if (!mobile || !Utils.checkPhone(mobile)) {
        return Handle.error(res, '1003', 400)
    }

    next()
}

//校验密码长度 6-16位
user.verifyPwd = (req, res, next) => {
    let password

    if (req.body.password) {
        password = req.body.password
    }

    if (req.body.newPassword) {
        password = req.body.newPassword
    }

    if (!_verifyPwd(password)) {
        return Handle.error(res, '1006', 400)
    }

    next()
}

//校验是否绑定手机号
user.checkBindMobile = (req, res, next) => {
    const user = req.user

    if (user.user) {
        return Handle.error(res, '1022', 403)
    }

    next()
}

//校验用户是否存在
user.checkUser = function (req, res, next) {
    lightco.run(function * ($) {
        const mobile = req.body.mobile

        try {
            var [err, user] = yield Users.findOne({where: {'user': mobile}})
            if (err) throw err

            if (user) {
                return Handle.error(res, '1000', 403)
            }

            next()
        } catch (e) {
            logger.fatal(e)
            return Handle.error(res)
        }
    })
}


module.exports = user
