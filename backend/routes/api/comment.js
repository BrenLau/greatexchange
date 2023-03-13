const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User
const Offer = db.Offer
const Comment = db.Comment

router.post('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { offerId, listingId, seekingId, content } = req.body
        if (!req.user) {
            res.json({ message: 'error' })
            return null
        }
        const { username } = req.user

        if (offerId) {
            const comment = await Comment.create({ offerId, content, username })
            res.json(comment)
        } else if (listingId) {
            const comment = await Comment.create({ listingId, content, username })
            res.json(comment)
        } else if (seekingId) {
            const comment = await Comment.create({ seekingId, content, username })
            res.json(comment)
        } else {
            res.json({ message: 'error' })
            return null
        }

    }))

router.get('/',
    restoreUser,
    asyncHandler(async (req, res) => {


    }))



module.exports = router
