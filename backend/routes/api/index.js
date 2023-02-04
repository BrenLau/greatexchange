const router = require('express').Router();
const users = require('./user.js')




router.use('/users', users)




module.exports = router
