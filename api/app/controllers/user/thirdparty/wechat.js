'use strict'

const express = require('express')
const helper = require('../../../helper')
const router = express.Router()


 /**
  * @api {post} /app/user/thirdparty/wechat/login 微信登录
  * @apiGroup User
  *
  * @apiParam {Number} mobile 手机号
  *
  * @apiSuccessExample {json} Success-Response:
  *   HTTP/1.1 200 OK
  *   Body:
  *   {
  *     'smscode': '2005'
  *   }
  *
  * @apiVersion 1.0.0
  */
router.route('/login')
  .post(
    helper.user.thirdparty.wechat.login
  )





module.exports = router
