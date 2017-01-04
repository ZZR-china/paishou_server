var app = require('../app')
var supertest = require('supertest')
var request = supertest(app)
var should = require('should')

var token

describe('登录', function () {

  it('登录成功', function (done) {
    request.post('/api/user/login')
      .send({'mobile': '18840822722', 'password': '123456'})
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

})

const checkToken = (token, done) => {
  request.get('/api/user')
    .set('authorization', `Bearer ${token}`)
    .end(function (err, res) {
      res.status.should.equal(200)
      done(err)
    })
}


describe('退出', function () {

  it('退出成功', function (done) {
    request.post('/api/user/logout')
      .set('authorization', `Bearer ${token}`)
      .end(function (err, res) {
        res.status.should.equal(200)
        done(err)
      })
  })

})

exports.checkToken = checkToken
