const router = require('express').Router();
const users = require('./user.js')
const auth = require('./auth')
const item = require('./item')
const listing = require('./listing')

router.use('/auth', auth)
router.use('/users', users)
router.use('/items', item)
router.use('/listings', listing)



module.exports = router
