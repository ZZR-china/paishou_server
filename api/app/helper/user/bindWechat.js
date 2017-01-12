'use script'

const lightco = require('lightco')
const logger = log4js.getLogger('user-bindWechat')
const Sequelize = require('Sequelize')

const wechat = Services.wechat

const { Users } = Models


exports.index = (req, res) => {
    lightco.run(function *($) {
        const user = req.user
        const code = req.body.code

        try {
            var [err, transaction] = yield sequelize.transaction()
            if (err) throw err

            if (!code) {
                return Handle.error(res, '1030', 400)
            }

            if (user.wechatUnionid) {
                return Handle.error(res, '1023', 403)
            }

            var [err, authInfo] = yield wechat.auth.authorize(code, $)
            if (err) throw err

            if (authInfo.errmsg) {
              return Handle.error(res, '1021', 403)
            }

            if (!authInfo.unionid) {
              return Handle.error(res, '1021', 403)
            }

            let unionid = authInfo.unionid

            let opt = {where: {wechat_unionid: unionid}}

            var [err, _user] = yield Users.findOne(opt)
            if (err) throw err

            if (_user && !_user.user) {
                if (!user.nickName && _user.nickName) {
                    user.nickName = _user.nickName
                }

                if (!user.headImg && _user.headImg) {
                    user.headImg = _user.headImg
                }

                opt.transaction = transaction

                var [err] = yield Users.destroy(opt)
                if (err) throw err
            }

            user.wechatUnionid = unionid

            const saveOpt = {
                transaction: transaction
            }

            var [err] = yield user.save(saveOpt)
            if (err) throw err

            transaction.commit()

            return Handle.success(res, 0)

        } catch (e) {
            logger.fatal(e)
            if (transaction) {
                transaction.rollback()
            }
            return Handle.error(res)
        }
    })
}
