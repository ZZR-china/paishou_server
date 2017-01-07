'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()


 /**
  * @api {post} /app/user/retrieve/getsmscode 找回-申请短信码
  * @apiGroup User
  *
  * @apiParam {String} mobile 手机号
  *
  * @apiUse Success
  *
  * @apiDescription 10分钟内可以申请2次
  *
  * @apiVersion 1.0.0
  */
router.route('/getSmscode')
    .post(
        helper.user.checkPhone,
        helper.user.retrieve.getSmscode
    )

/**
 * @api {post} /app/user/retrieve/verifySmscode 找回-验证短信码
 * @apiGroup User
 *
 * @apiParam {String} mobile 手机号
 * @apiParam {String} smscode 短信码
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   Body:
 *   {
 *     'tem_token': 'f37db6e2-fa96-4b48-9a18-91e82666083f'
 *   }
 *
 * @apiVersion 1.0.0
 */
router.route('/verifySmscode')
    .post(
        helper.user.checkPhone,
        helper.user.retrieve.verifySmscode
    )

/**
 * @api {put} /app/user/retrieve/setPassword 找回-设置密码
 * @apiGroup User
 *
 * @apiDescription 密码长度：6-16位
 *
 * @apiParam {String} mobile 手机号
 * @apiParam {String} tem_token 临时token
 * @apiParam {String} password 短信码
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   Body:
 *   {
 *     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......'
 *   }
 *
 * @apiVersion 1.0.0
 */
router.route('/setPassword')
    .put(
        helper.user.checkPhone,
        helper.user.verifyPwd,
        helper.user.retrieve.setPassword
    )



module.exports = router
