'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 * @api {get} /app/series/hot 热门赛事
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒、204-返回值为空、排序（热门等级；开始时间）
 *
 * @apiParam {Number} offset 从第几位开始查询
 * @apiParam {Number} limit 查询数量（默认5，最大10）
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
* @apiParam {Number} id 系列赛（热门）ID
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
