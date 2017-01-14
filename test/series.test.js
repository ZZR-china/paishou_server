var app = require('../app')
var supertest = require('supertest')
var request = supertest(app)
var should = require('should')

/*************
 * 本测试需要加强 *
 *************/

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试热门赛事
 */

describe('[热门赛事]', function () {

    it('成功', function (done) {
        request.get('/app/series/hot')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })

})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试赛事详情
 */

describe('[赛事详情]', function () {

    it('成功', function (done) {
        request.get('/app/series/detail/2')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试赛事日历
 */

describe('[赛事日历]', function () {

    it('成功', function (done) {
        request.get('/app/series')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试赛事介绍
 */

describe('[赛事介绍]', function () {

    it('成功', function (done) {
        request.get('/app/series/hot/introduce/1')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试晋级名单
 */

describe('[晋级名单]', function () {

    it('成功', function (done) {
        request.get('/app/series/players/promotion/1')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试赛事结果
 */

describe('[赛事结果]', function () {

    it('成功', function (done) {
        request.get('/app/series/players/result/1')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试付款信息（一票通）
 */

describe('[付款信息（一票通）]', function () {

    it('成功', function (done) {
        request.get('/app/series/payInfo/oneTicket/1')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试付款信息（常规赛）
 */

describe('[付款信息（常规赛）]', function () {

    it('成功', function (done) {
        request.get('/app/series/payInfo/regular/1')
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })
})
