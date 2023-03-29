const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User
const Offer = db.Offer
const GroupMessage = db.GroupMessage

router.post('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req
        const { message } = req.body
        if (!user) {
            res.json({ message: 'Must be logged in' })
            return null
        }

        const groupmessage = await GroupMessage.create({ content: message, userId: user.id })
        const groupmessage1 = await GroupMessage.findOne({ where: { id: groupmessage.id }, include: [User] })
        res.json(groupmessage1)

    }))


router.get('/',
    asyncHandler(async (req, res) => {
        const messages = await GroupMessage.findAll({ include: [User] })
        res.json({ messages })
    }))


module.exports = router
