var app = require('../app')
var supertest = require('supertest')
var request = supertest(app)
var should = require('should')

var token,smsCode,temToken

var myMobile = '18840822722',
    oldPassword = '123456',
    newPassword = '123465'

const { Users } = Models

const cache = Services.cache
const verifyPwd = Conf.user.password.verify

/**
 * @author   xiaowu
 * @date     2017-01-13
 *
 * @description: 测试手机号注册
 *
 * 注：将myMobile换成自己的手机号
 */

let DeleteUser = function (mobile) {
    Users.destroy({where: {user: mobile}})
}

describe('[注册]', function () {

    DeleteUser(myMobile)

    it('申请短信码', function (done) {
        request.post('/app/user/register/getSmscode')
          .send({'mobile': myMobile})
          .end(function (err, res) {
            res.status.should.equal(200)

            cache.hget(`REG_${myMobile}`, 'sms_code', function (err, result) {
                smsCode = result
            })

            done(err)
          })
    })

    it('验证短信码', function (done) {
        request.post('/app/user/register/verifySmscode')
          .send({'mobile': myMobile, 'smsCode': smsCode})
          .end(function (err, res) {
            res.status.should.equal(200)

            const text = JSON.parse(res.text)
            temToken = text.temToken

            done(err)
          })
    })

    it('设置密码', function (done) {
        request.post('/app/user/register/setPassword')
          .send({
              'mobile': myMobile,
              'temToken': temToken,
              'password': newPassword,
          })
          .end(function (err, res) {
            res.status.should.equal(201)

            done(err)
          })
    })

})

/**
 * @author   xiaowu
 * @date     2017-01-14
 *
 * @description: 测试找回密码
 *
 * 注：将myMobile换成自己的手机号
 */

describe('[找回密码]', function () {

    it('申请短信码', function (done) {
        request.post('/app/user/retrieve/getSmscode')
          .send({'mobile': myMobile})
          .end(function (err, res) {
            res.status.should.equal(200)

            cache.hget(`RET_${myMobile}`, 'sms_code', function (err, result) {
                smsCode = result
            })

            done(err)
          })
    })

    it('验证短信码', function (done) {
        request.post('/app/user/retrieve/verifySmscode')
          .send({'mobile': myMobile, 'smsCode': smsCode})
          .end(function (err, res) {
            res.status.should.equal(200)

            const text = JSON.parse(res.text)
            temToken = text.temToken

            done(err)
          })
    })

    it('设置密码', function (done) {
        request.put('/app/user/retrieve/setPassword')
          .send({
              'mobile': myMobile,
              'temToken': temToken,
              'password': oldPassword,
          })
          .end(function (err, res) {
              res.status.should.equal(201)

              done(err)
          })
    })

})

/**
 * @author   xiaowu
 * @date     2017-01-13
 *
 * @description: 测试登录、修改密码、退出
 */

describe('[登录、修改密码、退出]', function () {

    it('登录成功', function (done) {
        request.post('/app/user/login')
          .send({'mobile': myMobile, 'password': oldPassword})
          .end(function (err, res) {
            res.status.should.equal(200)
            const text = JSON.parse(res.text)
            token = text.token
            done(err)
          })
    })

    it('修改成功', function (done) {
        request.put('/app/user/revise')
          .set('authorization', `Bearer ${token}`)
          .send({'oldPassword': oldPassword, 'newPassword': newPassword})
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })

    it('修改密码后登录成功', function (done) {
        request.post('/app/user/login')
          .send({'mobile': myMobile, 'password': newPassword})
          .end(function (err, res) {
            res.status.should.equal(200)
            const text = JSON.parse(res.text)
            token = text.token
            done(err)
          })
    })

    it('退出成功', function (done) {
        request.post('/app/user/logout')
          .set('authorization', `Bearer ${token}`)
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })

})

/**
 * @author   xiaowu
 * @date     2017-01-13
 *
 * @description: 测试校验手密码
 */

const _verifyPwd = (password, value) => {
    const result = verifyPwd(password)
    result.should.equal(value)
}

describe('[验证密码]', function () {

    it('错误：密码少于6位', function () {
        _verifyPwd('12345', false)
    })

    it('错误：密码大于16位', function () {
        _verifyPwd('123456789qwertyui', false)
    })

    it('密码正确', function () {
        _verifyPwd('123456', true)
    })

})

/**
 * @author   xiaowu
 * @date     2017-01-13
 *
 * @description: 测试校验手机号
 */

const checkPhone = (no, code, msg, done) => {
  request.post('/app/user/register/getSmscode')
    .send({'mobile': no})
    .end(function (err, res) {
      res.status.should.equal(code)
      const text = JSON.parse(res.text)
      text.errmsg.should.equal(msg)
      done(err)
    })
}

describe('[验证手机号]', function () {

    it('错误: 400 第二位不正确', function (done) {
      checkPhone(12840822722, 400, '无效的手机号码', done)
    })

    it('错误: 400 大于11位', function (done) {
      checkPhone(188408227222, 400, '无效的手机号码', done)
    })

    it('错误: 400 小于11位', function (done) {
      checkPhone(1884082272, 400, '无效的手机号码', done)
    })

})
