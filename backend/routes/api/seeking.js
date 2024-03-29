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
const Seeking = db.Seeking
const Comment = db.Comment

router.post('/',
    restoreUser,
    awss3.singleMulterUpload('file'),
    asyncHandler(async (req, res) => {
        const { user } = req
        const { name, summary } = req.body
        const userId = user.id

        const imageURL = await awss3.singlePublicFileUpload(req.file);
        const seeking = await Seeking.create({ userId, summary, name, image: imageURL })
        const seekingSent = await Seeking.findOne({ where: { id: seeking.id }, include: [User, Comment] })
        return res.json(seekingSent)

    })
)

router.get('/',
    restoreUser,
    asyncHandler(async (req, res) => {
        // const { userId } = req.params
        const seekings = await Seeking.findAll({ include: [User, Comment] })
        return res.json(seekings)
    })

)

router.delete(`/:seekingId`,
    restoreUser,
    asyncHandler(async (req, res) => {
        const { seekingId } = req.params
        const seeking = await Seeking.destroy({ where: { id: seekingId } })

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
