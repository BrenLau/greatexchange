const router = require('express').Router();
const users = require('./user.js')
const auth = require('./auth')
const item = require('./item')
const listing = require('./listing')
const offer = require('./offer')
const seeking = require('./seeking')
const comment = require('./comment')

router.use('/auth', auth)
router.use('/users', users)
router.use('/items', item)
router.use('/listings', listing)
router.use('/offers', offer)
router.use('/seekings', seeking)
router.use('/comments', comment)



module.exports = router
