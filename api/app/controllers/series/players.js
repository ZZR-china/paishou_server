'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 * @api {get} /app/series/players/promotion/:id 晋级名单
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒、204-返回值为空
 *
 * @apiParam {Number} id 晋级赛赛事ID
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/promotion/:id')
    .get(
        webcache.get,
        helper.series.players.promotion
    )

/**
* @api {get} /app/series/players/result/:id 赛事结果
* @apiGroup Series
*
* @apiDescription 缓存时间30秒、204-返回值为空
*
* @apiParam {Number} id 系列赛ID
*
* @apiUse Success
*
* @apiVersion 1.0.0
*/
router.route('/result/:id')
    .get(
        webcache.get,
        helper.series.players.result
    )

module.exports = router
