'use strict'

const express = require('express')
const helper = require('../helper')
const router = express.Router()
const handle = require('../../../lib/handle')
const util = require('util')

router.route('/')
  .post((req, res) => {
    const key = new Buffer('1a2b079f11', 'hex')
    const newKey = Buffer.from('1a2b079f11', 'hex')
    const raw = new Buffer(5)
    const newRaw = Buffer.alloc(5)
    raw.writeUInt32BE(1212121212, 0)
    console.log(raw);
    raw.writeUInt8(0.99999999, 4)
    console.log(raw);
    res.json(0)
  })









module.exports = router
