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
        console.log('made it')
        const { userId } = req.params
        console.log(userId)
        const items = await Item.findAll({ userId })
        console.log(items)
        return res.json({ items })
    })

)

module.exports = router
