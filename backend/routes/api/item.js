const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const awss3 = require('../../awsS3')

const db = require('../../models')
const Item = db.Item
const User = db.User

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
        console.log(items)
        return res.json({ items })
    })

)

router.delete(`/:itemId`,
    asyncHandler(async (req, res) => {
        const { itemId } = req.params
        const item = await Item.destroy({ where: { id: itemId } })
        console.log(item)
        res.json({ message: 'deleted' })

    }))

module.exports = router
