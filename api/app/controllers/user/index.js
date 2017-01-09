'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()


router.use('/register', require('./register')) //注册
router.use('/retrieve', require('./retrieve')) //找回
router.use('/thirdparty', require('./thirdparty')) //第三方登录

/**
 * @api {get} /app/user 获取个人信息
 * @apiGroup User
 *
 * @apiUse Header
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/')
    .get(
        Services.token.decode,
        //helper.user.verifyToken
        helper.user.info
    )

/**
 * @api {post} /app/user/login 登录
 * @apiGroup User
 *
 * @apiParam {String} mobile 手机号
 * @apiParam {String} password 密码
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
router.route('/login')
  .post(
    helper.user.login
  )

/**
 * @api {post} /app/user/logout 退出
 * @apiGroup User
 *
 * @apiUse Header
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/logout')
    .post(
        Services.token.decode,
        helper.user.logout
    )

/**
 * @api {put} /app/user/revise 修改密码
 * @apiGroup User
 *
 * @apiUse Header
 *
 * @apiParam {String} old_password 原密码
 * @apiParam {String} new_password 新密码
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/revise')
    .put(
        Services.token.decode,
        helper.user.verifyPwd,
        helper.user.revise
    )


module.exports = router
