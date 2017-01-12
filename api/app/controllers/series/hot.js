'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 @api {get} /app/series/hot 热门赛事
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空、排序（热门等级；开始时间）

 @apiParam {Number} offset 从第几位开始查询
 @apiParam {Number} limit 查询数量（默认5，最大10）

 @apiSuccess {String} id 系列赛ID*
 @apiSuccess {String} name 系列赛名称
 @apiSuccess {String} imageUrl 系列赛图片
 @apiSuccess {String} startDate 开始日期*
 @apiSuccess {String} endDate 结束日期*
 @apiSuccess {String} mainPondDesc 主赛奖池信息
 @apiSuccess {String} mainBuyinDesc 主赛买入信息
 @apiSuccess {String} country 国家*
 @apiSuccess {String} city 城市*

 @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
       "count": 1,
       "rows": [
         {
           "id": 4,
           "name": "Macau Poker Cup 25",
           "imageUrl": "http://cdn.91buyin.com/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE/mpc.jpg",
           "startDate": "2017-01-12",
           "endDate": "2017-01-31",
           "mainPondDesc": "5000w",
           "mainBuyinDesc": "1000",
           "country": "中国",
           "city": "北京"
         }
       ]
     }

 @apiVersion 1.0.0
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
 * @apiDescription 缓存时间30秒、204-返回值为空
 *
 * @apiParam {Number} id 系列赛（热门）ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "name": "虎扑系列1",
 *          "startDate": "2017-01-10",
 *          "endDate": "2017-01-15",
 *          "desc": "描述",
 *          "casino": {
 *            "address": "虹桥1"
 *          },
 *          "serie_images": [
 *            {
 *              "url": "http://cdn.91buyin.com/%95%B0%E6%8D%AE/mpc.jpg"
 *            },
 *            {
 *              "url": "http://cdn.91buyin.com/%95%B0%E6%8D%AE/mpc.jpg"
 *            }
 *          ]
 *    }
 *
 * @apiVersion 1.0.0
 */
router.route('/introduce/:id')
    .get(
        webcache.get,
        helper.series.hot.introduce
    )

module.exports = router
