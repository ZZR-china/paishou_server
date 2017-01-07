var app = require('../app')
var supertest = require('supertest')
var request = supertest(app)
var should = require('should')

var token

const { User } = Models

const verifyPwd = Conf.user.password.verify

let CreateUser = function () {
    User.create({
        user: '18840822721',
        password: 'af90d4ca6a24a88d5c129935e32a0e5d',
        mobile: '18840822721',
    })
}

let DeleteUser = function () {
    User.destroy({where: {user: '18840822721'}})
}

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

const checkToken = (token, done) => {
  request.get('/app/user')
    .set('authorization', `Bearer ${token}`)
    .end(function (err, res) {
      res.status.should.equal(200)
      done(err)
    })
}

describe('[登录、修改密码、退出]', function () {
    //删除测试用户
    DeleteUser()
    //创建测试用户
    CreateUser()

    it('登录成功', function (done) {
        request.post('/app/user/login')
          .send({'mobile': '18840822721', 'password': '123456'})
          .end(function (err, res) {
            res.status.should.equal(200)
            const text = JSON.parse(res.text)
            token = text.token
            done(err)
          })
    })

    it('验证token', function (done) {
        checkToken(token, done)
    })

    it('修改成功', function (done) {
        request.put('/app/user/revise')
          .set('authorization', `Bearer ${token}`)
          .send({'old_password': '123456', 'new_password': '123465'})
          .end(function (err, res) {
            res.status.should.equal(200)
            done(err)
          })
    })

    it('修改密码后登录成功', function (done) {
        request.post('/app/user/login')
          .send({'mobile': '18840822721', 'password': '123465'})
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


exports.checkToken = checkToken
