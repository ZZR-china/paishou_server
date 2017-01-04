const express = require('express')
const router = express.Router()
var app = require('../app');

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Player App',
  })
})


router.use('/app', require('../api/app/controllers'))


module.exports = router
