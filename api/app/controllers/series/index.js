'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')
const webcache = Services.cache.webcache

router.use('/hot', require('./hot')) //热门赛事
router.use('/players', require('./players')) //名次
router.use('/payInfo', require('./payInfo')) //付款信息


/**
 @api {get} /app/series 赛事日历
 @apiGroup Series

 @apiDescription 缓存时间30秒、返回数据为当前月份的前一年和后一年（当前17年12月，则返回16年12月到18年12月）、排序（默认开始时间）

 @apiSuccess {Number} id 系列赛ID*
 @apiSuccess {Boolean} isHot 是否热门赛事*
 @apiSuccess {Boolean} isCooperated 是否合作赛事*
 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {DATE} startDate 开始日期*
 @apiSuccess {DATE} endDate 结束日期*
 @apiSuccess {String} country 国家*
 @apiSuccess {String} city 城市*

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "count": 2,
      "rows": [
        {
          "id": 2,
          "isHot": 1,
          "isCooperated": 0,
          "name": "虎扑系列2",
          "startDate": "2017-01-10",
          "endDate": "2017-01-15",
          "isOneTicket": 1,
          "country": "中国2",
          "city": "北京1"
        },
        {
          "id": 3,
          "isHot": 0,
          "isCooperated": 0,
          "name": "虎扑系列3",
          "startDate": "2017-03-10",
          "endDate": "2017-01-15",
          "isOneTicket": 0,
          "country": "中国1",
          "city": "北京1"
        }
      ]
    }

 @apiVersion 1.0.0
 */
router.route('/')
  .get(
    webcache.get,
    helper.series.calendar
  )

/**
 @api {get} /app/series/isHot/detail/:id 赛事详情（热门）
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空、重名字段用‘_’区分

 @apiParam {Number} id 系列赛ID

 @apiSuccess {String} id 系列赛ID*
 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {DATE} startDate 开始日期*
 @apiSuccess {DATE} endDate 结束日期*
 @apiSuccess {Boolean} isOneTicket 是否一票通赛事*
 @apiSuccess {String} id_matches 赛事ID*
 @apiSuccess {Number} publishState 发布转态*
 @apiSuccess {Number} haveResult 是否有赛事结果*
 @apiSuccess {Number} isPromotion 是否晋级赛*
 @apiSuccess {String} name_matches 赛事名称*
 @apiSuccess {DATE} matchDay 比赛日期
 @apiSuccess {Decimal} realBuyin 买入金额
 @apiSuccess {Decimal} rakeBuyin 佣金
 @apiSuccess {TIME} startTime 比赛开始时间
 @apiSuccess {Decimal} unitPrice 赛事价格
 @apiSuccess {String} name_type 赛事类型*
 @apiSuccess {String} name_currency 货币种类*
 @apiSuccess {String} state 状态*
 @apiSuccess {Number} 1  无门票价格
 @apiSuccess {Number} 2 不可购票，显示价格
 @apiSuccess {Number} 3 可以购票
 @apiSuccess {Number} 4 比赛结束，无赛事结果
 @apiSuccess {Number} 5 比赛结束，有赛事结果（晋级赛）
 @apiSuccess {Number} 6 比赛结束，有赛事结果（非晋级赛）

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
      "id": 2,
      "name": "虎扑系列2",
      "startDate": "2017-01-10",
      "endDate": "2017-01-15",
      "isOneTicket": true,
      "matches": [
        {
          "id": 5,
          "publishState": 3,
          "haveResult": true,
          "isPromotion": false,
          "name": "2",
          "matchDay": "2017-01-06",
          "realBuyin": 0,
          "rakeBuyin": 0,
          "startTime": "19:16:47",
          "unitPrice": 1,
          "type": {
            "name": "asdf"
          },
          "currency": {
            "name": "¥"
          },
          "state": 6
        },
        {
          "id": 6,
          "publishState": 2,
          "haveResult": false,
          "isPromotion": true,
          "name": "2",
          "matchDay": "2017-01-06",
          "realBuyin": 0,
          "rakeBuyin": 0,
          "startTime": "19:16:47",
          "unitPrice": null,
          "type": {
            "name": "asdf"
          },
          "currency": {
            "name": "¥"
          },
          "state": 3
        },
        {
          "id": 7,
          "publishState": 2,
          "haveResult": false,
          "isPromotion": 2,
          "name": "2",
          "matchDay": "2017-01-06",
          "realBuyin": 0,
          "rakeBuyin": 0,
          "startTime": "19:16:47",
          "unitPrice": null,
          "type": {
            "name": "asdf"
          },
          "currency": {
            "name": "¥"
          },
          "state": 3
        }
      ],
      "oneTicketInfo": {
        "id": 2,
        "publish_state": 2,
        "name": "2",
        "isOneTicketMatch": true,
        "matchDay": "2017-01-06",
        "startTime": "19:16:47",
        "realBuyin": 0,
        "rakeBuyin": 0,
        "absDiscount": null,
        "relDiscount": null,
        "unitPrice": null,
        "type": {
          "name": "asdf"
        },
        "currency": {
          "name": "¥"
        }
      }
    }

 * @apiVersion 1.0.0
 */

router.route('/isHot/detail/:id')
  .get(
    webcache.get,
    helper.series.isHotDetail
  )

/**
@api {get} /app/series/detail/:id 赛事详情（非热门）
@apiGroup Series

@apiDescription 缓存时间30秒、204-返回值为空、重名字段用‘_’区分

@apiParam {Number} id 系列赛ID

@apiParam {Number} id 系列赛ID*
@apiSuccess {String} name 系列赛名称*
@apiSuccess {String} phone 举办方手机
@apiSuccess {String} website 网址
@apiSuccess {Boolean} isOneTicket 是否一票通赛事*
@apiSuccess {String} url 系列赛图集
@apiSuccess {String} address 赛事地址*
@apiSuccess {String} id_matches 赛事ID*
@apiSuccess {String} publishState 发布状态*
@apiSuccess {String} name_matches 赛事名称
@apiSuccess {DATE} matchDay 比赛日期
@apiSuccess {Decimal} realBuyin 买入金额
@apiSuccess {Decimal} rakeBuyin 佣金
@apiSuccess {Decimal} absDiscount 绝对打折
@apiSuccess {Decimal} relDiscount 相对打折
@apiSuccess {Decimal} unitPrice 单价
@apiSuccess {String} name_currency 货币种类*

@apiSuccessExample Success-Response:
  HTTP/1.1 200 OK
  {
    "id": 1,
    "name": "虎扑系列1",
    "phone": null,
    "website": null,
    "isOneTicket": true,
    "serieImages": [
      {
        "url": "12"
      },
      {
        "url": "12"
      }
    ],
    "casino": {
      "address": "虹桥1"
    },
    "matches": [
      {
        "id": 3,
        "publishState": 2,
        "name": "3",
        "matchDay": "2017-01-06",
        "realBuyin": 0,
        "rakeBuyin": 0,
        "absDiscount": null,
        "relDiscount": null,
        "unitPrice": null,
        "currency": {
          "name": "¥"
        }
      },
      {
        "id": 4,
        "publish_state": 2,
        "name": "4",
        "matchDay": "2017-01-06",
        "realBuyin": 0,
        "rakeBuyin": 0,
        "absDiscount": null,
        "relDiscount": null,
        "unitPrice": null,
        "currency": {
          "name": "¥"
        }
      },
      {
        "id": 1,
        "publish_state": 2,
        "name": "1",
        "matchDay": "2017-01-07",
        "realBuyin": 0,
        "rakeBuyin": 0,
        "absDiscount": null,
        "relDiscount": null,
        "unitPrice": null,
        "currency": {
          "name": "¥"
        }
      }
    ]
  }

* @apiVersion 1.0.0
*/

router.route('/detail/:id')
  .get(
    webcache.get,
    helper.series.detail
  )

module.exports = router
