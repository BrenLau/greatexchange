const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

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
        const listToSend = await Listing.findOne({ where: { id: listing.id }, include: [User, Item] })
        return res.json({ listing: listToSend })

    })
)

router.get('/',
    asyncHandler(async (req, res) => {
        const listings = await Listing.findAll({ include: [Item, User] })
        return res.json({ listings })
    }))


router.put('/:listingId',
    asyncHandler(async (req, res) => {
        const { listingId } = req.params
        const { request } = req.body
        const listing = await Listing.findOne({ where: { id: listingId } })
        listing.request = request
        await listing.save()
        const listToSend = await Listing.findOne({ where: { id: listing.id }, include: [User, Item] })
        return res.json(listToSend)
    }))


router.delete('/:listingId',
    asyncHandler(async (req, res) => {

        const { listingId } = req.params

        const listing = await Listing.destroy({ where: { id: listingId } })
        const item = await Item.findOne({ where: { listingId: listing.id } })
        item.listingId = null
        await item.save()
        return res.json({ message: 'list has been deleted' })
    }))




module.exports = router
