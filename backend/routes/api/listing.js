const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const awss3 = require('../../awsS3')

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User

router.post('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req
        const { request, itemId } = req.body
        const userId = user.id
        const updatedItem = await Item.findOne({ where: { id: itemId } })
        if (updatedItem.listingId) {
            return res.json({ error: 'Item already listed' })
        }

        const listing = await Listing.create({ userId, request, status: true })
        updatedItem.listingId = listing.id
        await updatedItem.save()
        listing.item = updatedItem
        return res.json({ listing, item: updatedItem })

    })
)

router.get('/',
    asyncHandler(async (req, res) => {
        const listings = await Listing.findAll({ include: Item })
        return res.json({ listings })
    }))








module.exports = router
