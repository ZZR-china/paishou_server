var app = require('../app')
var supertest = require('supertest')
var request = supertest(app)
var should = require('should')

var smscode,temToken

const checkPhone = (no, code, msg, done) => {

  request.post('/api/user/register/getSmscode')
    .send({'mobile': no})
    .end(function (err, res) {
      res.status.should.equal(code)
      const text = JSON.parse(res.text)
      text.errmsg.should.equal(msg)
      done(err)
    })
    
}

it('error: 400 第二位不正确', function (done) {
  checkPhone(12840822722, 400, '无效的手机号码', done)
})

it('error: 400 大于11位', function (done) {
  checkPhone(188408227222, 400, '无效的手机号码', done)
})

it('error: 400 小于11位', function (done) {
  checkPhone(1884082272, 400, '无效的手机号码', done)
})




//
// describe('注册', function () {
//
//   it('success: 200', function (done) {
//
//     request.post('/api/user/register/getSmscode')
//
//       .send({'mobile': '18840822722'})
//       .end(function (err, res) {
//
//         res.status.should.equal(200)
//         const text = JSON.parse(res.text)
//         smscode = text.smscode
//
//         done(err)
//       })
//   })
//
//   it('success: 200', function (done) {
//
//     request.post('/api/user/register/verifySmscode')
//
//       .send({'mobile': '18840822722', 'smscode': smscode})
//       .end(function (err, res) {
//
//         res.status.should.equal(200)
//         const text = JSON.parse(res.text)
//         temToken = text.temToken
//
//         done(err)
//       })
//   })
//
//   it('success: 200', function (done) {
//
//     request.post('/api/user/register/setPassword')
//
//       .send({'mobile': '18840822722', 'password': '123456', 'temToken': temToken})
//       .end(function (err, res) {
//
//         res.status.should.equal(200)
//
//         done(err)
//       })
//   })
// })
