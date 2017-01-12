'use script'

const request = require('request')
const lightco = require('lightco')
const logger = log4js.getLogger('user-thirdparty-wechat')

const wechat = Services.wechat

const { Users } = Models


exports.login = (req, res) => {
  lightco.run(function *($) {
    const code = req.body.code

    try {
        if (!code) {
            return Handle.error(res, '1030', 400)
        }

        var [err, authInfo] = yield wechat.auth.authorize(code, $)
        if (err) throw err

        if (authInfo.errmsg) {
          return Handle.error(res, '1021', 403)
        }

        if (!authInfo.unionid) {
          return Handle.error(res, '1021', 403)
        }

        let bind = false
        let created = false

        let unionid = authInfo.unionid
        let access_token  = authInfo.access_token
        let openid  = authInfo.openid

        let opt =  {wechat_unionid: unionid}

        var [err, user] = yield Users.findOne({where: opt})
        if (err) throw err

        if (!user) {

            var [err, userInfo] = yield wechat.user.info(access_token, openid, $)
            if (err) throw err

            const userOpts = {
                wechatUnionid: unionid,
                nickName: userInfo.nickname,
                headImg: userInfo.headimgurl,
            }

            var [err, _user] = yield Users.create(userOpts)
            if (err) throw err

            created = true
            user = _user
        }

        if (user && !user.user) {
            created = true
        }

        if (user && user.user) {
            bind = true
        }

        var [err, jwt] = yield Services.token.encode(user, $)
        if (err) throw err

        const json = {
            created: created,
            bind: bind,
            temToken: jwt,
        }

        return Handle.success(res, json)
    } catch (e) {
        logger.fatal(e)
        return Handle.error(res)
    }
  })
}
