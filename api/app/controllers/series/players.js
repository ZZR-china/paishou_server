'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 @api {get} /app/series/players/promotion/:id 晋级名单
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {Number} id 晋级赛赛事ID

 @apiSuccess {String} name 姓名*
 @apiSuccess {Number} stack 筹码量*
 @apiSuccess {String} table 桌号*
 @apiSuccess {String} seat 座位号*
 @apiSuccess {String} country 国家

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "count": 1,
      "rows": [
        {
          "name": "2",
          "stack": 3,
          "table": "4",
          "seat": "5",
          "country": "中国1"
        }
      ]
    }
 @apiVersion 1.0.0
 */
router.route('/promotion/:id')
    .get(
        webcache.get,
        helper.series.players.promotion
    )

/**
 @api {get} /app/series/players/result/:id 赛事结果
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {Number} id 系列赛ID

 @apiSuccess {Number} rank 排名*
 @apiSuccess {Number} name 名称*
 @apiSuccess {String} bonus 奖金*
 @apiSuccess {String} country 国家

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "count": 1,
      "rows": [
        {
          "rank": 2,
          "name": "1",
          "bonus": 2,
          "country": "中国1"
        }
      ]
    }

 @apiVersion 1.0.0
*/
router.route('/result/:id')
    .get(
        webcache.get,
        helper.series.players.result
    )

module.exports = router
