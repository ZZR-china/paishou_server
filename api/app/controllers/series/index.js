'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

router.use('/hot', require('./hot')) //热门赛事
router.use('/players', require('./players')) //名次


/**
 * @api {get} /app/series 赛事日历
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒、204-返回值为空
 *
 * @apiParam {String} month 按月查询（201701）
 * @apiParam {String} country 按国家查询
 * @apiParam {String} tour 按巡回赛名称查询
 * @apiParam {String} order 排序（默认开始时间）
 * @apiParam {Number} offset 从第几位开始查询
 * @apiParam {Number} limit 查询数量（默认10，最大15）
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/')
  .get(
    webcache.get,
    helper.series.calendar
  )

/**
 * @api {get} /app/series/detail/:id 赛事详情（热门、非热门）
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒
 *
 * @apiParam {Number} id 系列赛ID
 *
 * @apiUse Success
 *
 * @apiVersion 1.0.0
 */
router.route('/detail/:id')
  .get(
    webcache.get,
    helper.series.detail
  )


module.exports = router
