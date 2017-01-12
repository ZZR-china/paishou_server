'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 * @api {get} /app/series/payInfo/oneTicket/:id 付款信息（一票通）
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
router.route('/oneTicket/:id')
    .get(
        webcache.get,
        helper.series.payInfo.oneTicket
    )

/**
 * @api {get} /app/series/payInfo/regular/:id 付款信息（常规赛）
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒、204-返回值为空
 *
 * @apiParam {Number} id 常规赛ID
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/regular/:id')
    .get(
        webcache.get,
        helper.series.payInfo.regular
    )


module.exports = router
