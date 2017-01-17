'use strict'

const express = require('express')
const router = express.Router()

const helper = require('../../helper')


router.route('/join/:id')
  .post(
    Services.token.decode,
    helper.matches.join
  )




module.exports = router
