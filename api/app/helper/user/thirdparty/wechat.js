'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('user-thirdparty-wechat')
const wechat = Services.wechat

const { User } = Models


exports.login = (req, res) => {
  lightco.run(function *($) {
    var transaction
    try {
        var [err, transaction] = yield sequelize.transaction()
        if (err) throw err

        const code = req.body.code

        var [err, value] = yield wechat.auth.authorize(code, $)
        if (err) throw err

        if (value.errmsg) {
          transaction.commit()
          return Handle.error(res, '1021', 403)
        }

        if (!value.unionid) {
          transaction.commit()
          return Handle.error(res, '1021', 403)
        }

        let unionid = value.unionid

        let opt = {
          where: {wechat_unionid: unionid},
          transaction: transaction,
        }

        var [err, user] = yield User.findOne(opt)
        if (err) throw err

        let created = false

        /* 首次登陆 */
        if (!user) {
            const new_user = {
                wechat_unionid: unionid
            }
            const opts = {
                transaction: transaction
            }
            /* 创建用户 */
            var [err, _user] = yield User.create(new_user, opts)
            if (err) throw err

            created = true
            user = _user
        }

        var [err, jwt] = yield Services.token.encode(user, $)
        if (err) throw err

        const ret = {
            created: created,
            token: jwt
        }

        transaction.commit()

        return res.json(Conf.promise('0', ret))

    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}
