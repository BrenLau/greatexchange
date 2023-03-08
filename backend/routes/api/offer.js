const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const db = require('../../models')
const Item = db.Item
const Listing = db.Listing
const User = db.User
const Offer = db.Offer

router.delete('/:offerId',
    asyncHandler(async (req, res) => {

        const { offerId } = req.params

        const offer = await Offer.findOne({ where: { id: offerId } })
        if (offer) {
            const items = await Item.findAll({ where: { offerId: offer.id } })
            items.forEach(async (item) => {
                item.offerId = null
                await item.save()
            })
            await Offer.destroy({ where: { id: offerId } })
        }
        return res.json({ message: 'list has been deleted' })
    }))





module.exports = router
