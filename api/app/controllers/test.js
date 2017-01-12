'use strict'

const base64 = require('node-base64-image')
const request = require("co-request")
const express = require('express')
const router = express.Router()
const lightco = require('lightco')
const helper = require('../helper')
const handle = require('../../../lib/handle')
const util = require('util')

const { Countries,
        Cities,
        Casinos,
        Series,
        Users, } = Models

router.route('/')
  .post((req, res) => {
    lightco.run(function *($) {

        const opts = {
            url: 'http://wx.qlogo.cn/mmopen/cnrKpLScJu57hXAfOvZD0knoibia9Y8hX0tERTLJRxQ80lW3AImGc5rDXaibtktuDy9icMz1qspIjWZ2egjNSXAho8juX9TgSCicJ/0',
            encoding: null,
        }

        // var result = base64.encode(opts.url)
        //
        // res.json(result)

        // var [err, response] = yield request.get(opts)
        //
        // var base64 = Buffer.from(response.body, 'binary').toString('base64')
        //
        // res.json(base64)

        var [err, response] = yield request.get(opts)

        const base64 = response.body.toString('base64')

        const opt = {
            headImg: base64
        }

        var [err, user] = yield Users.create(opt)
        if (err) console.log(err);

        var [err, _user] = yield Users.findById(user.id)
        if (err) console.log(_user);

        res.json(_user.headImg)


        // request.get(opts, function (err, response, body) {
        //     var base64 = Buffer.from(body, 'binary').toString('base64')
        //
        //     res.json(base64)
        // })

    })
  })









module.exports = router
