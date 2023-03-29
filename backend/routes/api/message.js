const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { Op } = require("sequelize")

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User
const Offer = db.Offer
const GroupMessage = db.GroupMessage
const PrivateMessage = db.PrivateMessage

router.post('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req
        const { content, receiverId, senderId } = req.body
        console.log(receiverId)
        if (!user || user.id != senderId) {
            res.json({ message: 'Must be logged in' })
            return null
        }

        const privatemessage = await PrivateMessage.create({ content, senderId: user.id, receiverId })
        const privatemessage1 = await PrivateMessage.findOne({ where: { id: privatemessage.id }, include: [User] })
        console.log(privatemessage1)
        res.json(privatemessage1)

    }))


router.get('/user/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params
        const messages = await PrivateMessage.findAll({ where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] }, include: [User] })
        res.json({ messages })
    }))


module.exports = router
