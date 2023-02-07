const router = require('express').Router();
const users = require('./user.js')
const auth = require('./auth')
const item = require('./item')


router.use('/users', users)
router.use('/auth', auth)
router.use('/items', item)



module.exports = router
