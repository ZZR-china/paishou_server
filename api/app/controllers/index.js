
const express = require('express')
const router = express.Router()


router.use('/test', require('./test'))
router.use('/user', require('./user'))
router.use('/series', require('./series'))
router.use('/match', require('./matches'))


module.exports = router
