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

 @apiDescription 缓存时间30秒、204-返回值为空

 @apiParam {String} month 按月查询（201701）
 @apiParam {String} country 按国家查询
 @apiParam {String} tour 按巡回赛名称查询
 @apiParam {String} order 排序（默认开始时间）
 @apiParam {Number} offset 从第几位开始查询
 @apiParam {Number} limit 查询数量（默认10，最大15）

 @apiSuccess {Number} id 系列赛ID*
 @apiSuccess {Boolean} isHot 是否热门赛事*
 @apiSuccess {Boolean} isCooperated 是否热门赛事*
 @apiSuccess {String} name 系列赛名称*
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
 @api {get} /app/series/detail/:id 赛事详情（热门、非热门）
 @apiGroup Series

 @apiDescription 缓存时间30秒、204-返回值为空、重名字段用‘_’区分

 @apiParam {Number} id 系列赛ID

 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {Boolean} isOneTicket 是否一票通赛事*
 @apiSuccess {String} id 赛事ID
 @apiSuccess {String} name_matches 赛事名称*
 @apiSuccess {Boolean} isOneTicketMatch 是否一票通赛事*
 @apiSuccess {DATE} matchDay 比赛日期
 @apiSuccess {TIME} startTime 比赛开始时间
 @apiSuccess {Decimal} unitPrice 赛事价格
 @apiSuccess {String} name_type 赛事类型
 @apiSuccess {String} isHot 以上是热门
 @apiSuccess {String} notHot 以下是非热门
 @apiSuccess {String} name 系列赛名称*
 @apiSuccess {String} phone 举办方手机
 @apiSuccess {String} website 网址
 @apiSuccess {Boolean} isOneTicket 是否一票通赛事*
 @apiSuccess {String} url 系列赛图集
 @apiSuccess {String} address 赛事地址*
 @apiSuccess {String} id 赛事ID
 @apiSuccess {String} name_matches 赛事名称
 @apiSuccess {DATE} matchDay 比赛日期
 @apiSuccess {Decimal} realBuyin 买入金额
 @apiSuccess {Decimal} rakeBuyin 佣金
 @apiSuccess {Decimal} absDiscount 绝对打折
 @apiSuccess {Decimal} relDiscount 相对打折
 @apiSuccess {Decimal} unitPrice 单价

 @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
 热门:(isOneTicket=true oneTicketInfo存在)
    {
      "name": "Macau Poker Cup 25",
      "isOneTicket": true,
      "oneTicketInfo": {
          "id": 2,
          "name": "2",
          "isOneTicketMatch": true,
          "matchDay": "2017-01-06",
          "startTime": "19:16:47",
          "unitPrice": null,
      },
      "matches": [
        {
          "id": "1"
          "name": "超级挑战杯",
          "matchDay": "2017-01-15",
          "startTime": 19:16:47,
          "unitPrice": "12",
          "type": {
            "name": "hold'em"
          }
        }
    }
 非热门:
    {
      "name": "虎扑系列1",
      "phone": "18840877322",
      "website": null,
      "isOneTicket": true,
      "serieImages": [
        {
          "url": "http://cdn.91buyin.com/mpc.jpg"
        },
        {
          "url": "http://cdn.91buyin.com/mpc.jpg"
        }
      ],
      "casino": {
        "address": "虹桥1"
      },
      "matches": [
        {
          "id": 1,
          "name": "1",
          "matchDay": "2017-01-07",
          "realBuyin": 0,
          "rakeBuyin": 0,
          "absDiscount": 0,
          "relDiscount": 0,
          "unitPrice": 0
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
