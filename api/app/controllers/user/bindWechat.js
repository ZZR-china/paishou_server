'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()


 /**
  * @api {post} /app/user/bindWechat 绑定微信
  * @apiGroup User
  *
  * @apiParam {String} code 微信授权码
  *
  * @apiUse Header
  *
  * @apiUse Success
  *
  * @apiDescription 如果之前微信登录但没有绑定手机，会删掉之前的数据。
  *
  * @apiVersion 1.0.0
  */
router.route('/')
    .post(
        Services.token.decode,
        helper.user.bindWechat.index
    )


module.exports = router
