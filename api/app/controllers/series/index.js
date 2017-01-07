'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()

const webcache = Services.cache.webcache


/**
 * @api {get} /app/series/hot 热门赛事列表
 * @apiGroup Series
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/hot')
  .get(
    webcache.get,
    helper.series.is_hot
  )

/**
 * @api {get} /app/series/detail/:id 赛事详情
 * @apiGroup Series
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/detail/:id')
  .get(
    helper.series.detail
  )

/**
 * @api {post} /app/user/logout 退出
 * @apiGroup Series
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
 * @apiGroup Series
 *
 * @apiUse Header
 *
 * @apiParam {String} oldPassword 原密码
 * @apiParam {String} newPassword 新密码
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/revise')
  .put(
    Services.token.decode,
    helper.user.revise
  )


module.exports = router
