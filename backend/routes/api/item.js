const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const awss3 = require('../../awsS3')

const db = require('../../models');
const Item = db.Item
const User = db.User
const Listing = db.Listing
const Offer = db.Offer

router.post('/',
    restoreUser,
    awss3.singleMulterUpload('file'),
    asyncHandler(async (req, res) => {
        const { user } = req
        const { name } = req.body
        const userId = user.id

        const imageURL = await awss3.singlePublicFileUpload(req.file);
        const item = await Item.create({ userId, name, image: imageURL })

        return res.json(item)

    })
)

router.get('/user/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params
        const items = await Item.findAll({ where: { userId } })
        return res.json({ items })
    })

)

router.delete(`/:itemId`,
    asyncHandler(async (req, res) => {
        const { itemId } = req.params
        const item = await Item.findOne({ where: { id: itemId } })
        if (item.listingId) {
            const listing = await Listing.destroy({ where: { id: item.listingId } })
        }
        if (item.offerId) {
            const items = await Item.findAll({ where: { offerId: item.offerId } })
            items.forEach(async (item) => {
                item.offerId = null
                await item.save()
            })
            await Offer.destroy({ where: { id: item.offerId } })
        }

        await Item.destroy({ where: { id: itemId } })
        res.json({ message: 'deleted' })
        return
    })
)

router.put(`/:itemId`,
    awss3.singleMulterUpload('file'),
    asyncHandler(async (req, res) => {
        const { itemId } = req.params
        const { name } = req.body

        const item = await Item.findOne({ where: { id: itemId } })
        if (item && name) {
            item.name = name
            await item.save()
        }

        const imageURL = await awss3.singlePublicFileUpload(req.file);

        if (imageURL) {
            item.image = imageURL
            await item.save()
        }
        return res.json(item)

    })
)



module.exports = router
