
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
