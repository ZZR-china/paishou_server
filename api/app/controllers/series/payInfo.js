'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

/**
 @api {get} /app/series/payInfo/oneTicket/:id 付款信息（一票通）
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {Number} id 系列赛ID

 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {DATE} startDate 开始日期*
 @apiSuccess {DATE} endDate 结束日期*
 @apiSuccess {String} address 赛事地址*
 @apiSuccess {Decimal} realBuyin 买入金额
 @apiSuccess {Decimal} rakeBuyin 佣金
 @apiSuccess {Decimal} absDiscount 绝对打折
 @apiSuccess {Decimal} relDiscount 相对打折
 @apiSuccess {Decimal} unitPrice 单价

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "name": "虎扑系列1",
      "startDate": "2017-01-10",
      "endDate": "2017-01-15",
      "casino": {
        "address": "虹桥1"
      },
      "matches": [
        {
          "rakeBuyin": 0,
          "realBuyin": 0,
          "absDiscount": 0,
          "relDiscount": 0,
          "unitPrice": 0
        }
      ]
    }

 @apiVersion 1.0.0
 */
router.route('/oneTicket/:id')
    .get(
        webcache.get,
        helper.series.payInfo.oneTicket
    )

/**
 @api {get} /app/series/payInfo/regular/:id 付款信息（常规赛）
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {Number} id 常规赛ID

 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {TIME} startDstartTimeate 开始时间*
 @apiSuccess {Decimal} realBuyin 买入金额
 @apiSuccess {Decimal} rakeBuyin 佣金
 @apiSuccess {Decimal} absDiscount 绝对打折
 @apiSuccess {Decimal} relDiscount 相对打折
 @apiSuccess {Decimal} unitPrice 单价
 @apiSuccess {String} remark 备注
 @apiSuccess {String} address 赛事地址*

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "name": "1",
      "startTime": "19:16:47",
      "realBuyin": 0,
      "rakeBuyin": 0,
      "absDiscount": 0,
      "relDiscount": 0,
      "unitPrice": 0,
      "remark": 0,
      "address": "虹桥1"
    }

 @apiVersion 1.0.0
 */
router.route('/regular/:id')
    .get(
        webcache.get,
        helper.series.payInfo.regular
    )


module.exports = router
