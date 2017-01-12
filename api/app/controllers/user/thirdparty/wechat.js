'use strict'

const express = require('express')
const helper = require('../../../helper')
const router = express.Router()


 /**
  * @api {post} /app/user/thirdparty/wechat/login 微信登录
  * @apiGroup User
  *
  * @apiParam {String} code 微信授权码
  *
  * @apiSuccess {Boolean} created  是否存在unionid
  * @apiSuccess {Boolean} bind  是否绑定手机号
  * @apiSuccess {String} token  如未进行手机验证，要删除。
  *
  * @apiVersion 1.0.0
  */
router.route('/login')
  .post(
    helper.user.thirdparty.wechat.login
  )







module.exports = router
