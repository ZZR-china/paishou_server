'use strict'

const express = require('express')
const helper = require('../../helper')
const router = express.Router()

const webcache = Services.cache.webcache

router.use('/hot', require('./hot')) //热门赛事


/**
 * @api {get} /app/series 赛事日历
 * @apiGroup Series
 *
 * @apiDescription 缓存时间30秒
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
