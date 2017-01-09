'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()

const webcache = Services.cache.webcache

/**
 * @api {get} /app/series/hot 热门赛事
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒、204-返回值为空
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/')
    .get(
        webcache.get,
        helper.series.hot.list
    )

/**
* @api {get} /app/series/hot/inroduce/:id 赛事介绍（热门）
* @apiGroup Series
*
* @apiDescription 缓存时间30秒
*
* @apiUse Success
*
* @apiVersion 1.0.0
*/
router.route('/introduce/:id')
    .get(
        webcache.get,
        helper.series.hot.introduce
    )

module.exports = router
