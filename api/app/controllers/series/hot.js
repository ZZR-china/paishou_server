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
 @apiSuccess {Boolean} publishState 发布状态*
 @apiSuccess {Boolean} isCooperated 是否合作*
 @apiSuccess {String} name 系列赛名称
 @apiSuccess {String} imageUrl 系列赛图片
 @apiSuccess {DATE} startDate 开始日期*
 @apiSuccess {DATE} endDate 结束日期*
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
          "id": 2,
          "publishState": 1,
          "isCooperated": 0,
          "name": "虎扑系列2",
          "imageUrl": null,
          "startDate": "2017-01-10",
          "endDate": "2017-01-15",
          "mainPondDesc": null,
          "mainBuyinDesc": null,
          "country": "中国2",
          "city": "北京1"
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
 @api {get} /app/series/hot/inroduce/:id 赛事介绍（热门）
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {Number} id 系列赛（热门）ID

 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {DATE} startDate 开始日期*
 @apiSuccess {DATE} endDate 结束日期*
 @apiSuccess {String} desc 系列赛描述
 @apiSuccess {String} address 赛事地址
 @apiSuccess {String} url 系列赛图集

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "name": "虎扑系列1",
      "startDate": "2017-01-10",
      "endDate": "2017-01-15",
      "desc": "描述",
      "casino": {
        "address": "虹桥俱乐部"
      },
      "serieImages": [
        {
          "url": "http://cdn.91buyin.com/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE/mpc.jpg"
        },
        {
          "url": "http://cdn.91buyin.com/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE/mpc.jpg"
        }
      ]
    }

 @apiVersion 1.0.0
 */
router.route('/introduce/:id')
    .get(
        webcache.get,
        helper.series.hot.introduce
    )

module.exports = router
