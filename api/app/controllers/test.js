'use strict'

const express = require('express')
const lightco = require('lightco')
const helper = require('../helper')
const router = express.Router()
const handle = require('../../../lib/handle')
const util = require('util')

const { Countries,
        Cities,
        Casinos,
        Series, } = Models

router.route('/')
  .post((req, res) => {
    lightco.run(function *($) {
      var i = 1

      var cou_data = {
        id: i,
        name: `中国${i}`
      }

      var cit_data = {
        id: i,
        name: `北京${i}`
      }

      var cas_data = {
        id: i,
        name: `京扑${i}`,
        address: `虹桥${i}`,
        countries_id: i,
        cities_id: i,
      }

      var ser_data = {
        id: i,
        name: `虎扑系列${i}`,
        organizers_id: 1,
        casinos_id: i,
      }

      var [err] = yield Countries.create(cou_data)
      if (err) console.log(err)

      var [err] = yield Cities.create(cit_data)
      if (err) console.log(err)

      var [err] = yield Casinos.create(cas_data)
      if (err) console.log(err)

      var [err] = yield Series.create(ser_data)
      if (err) console.log(err)

      res.json(2)
    })
  })









module.exports = router
