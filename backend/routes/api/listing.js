const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User
const Offer = db.Offer

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
        const listings = await Listing.findAll({ include: [Item, User, { model: Offer, include: [Item] }] })
        return res.json({ listings })
    }))


router.put('/:listingId',
    asyncHandler(async (req, res) => {
        const { listingId } = req.params
        const { request } = req.body
        const listing = await Listing.findOne({ where: { id: listingId } })
        listing.request = request
        await listing.save()
        const listToSend = await Listing.findOne({ where: { id: listing.id }, include: [User, Item, { model: Offer, include: [Item] }] })
        return res.json(listToSend)
    }))


router.delete('/:listingId',
    asyncHandler(async (req, res) => {

        const { listingId } = req.params

        const listing = await Listing.findOne({ where: { id: listingId } })
        if (listing) {
            // const item = await Item.findOne({ where: { listingId: listing.id } })
            // item.listingId = null
            // await item.save()
            await Offer.destroy({ where: { listingId } })
            await Listing.destroy({ where: { id: listingId } })
        }
        return res.json({ message: 'list has been deleted' })
    }))

router.post('/offers/:listingId',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { listingId } = req.params
        const { user } = req
        const data = req.body
        const { cash, items } = data
        const offer = await Offer.create({ listingId, userId: user.id, cash: Number(cash) })
        Object.values(items).forEach(async (item) => {
            const ite = await Item.findOne({ where: { id: item.id } })
            ite.offerId = offer.id
            await ite.save()
        })
        return res.json(offer)
    }))


module.exports = router
