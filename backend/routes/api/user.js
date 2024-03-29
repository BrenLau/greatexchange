const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const awss3 = require('../../awsS3')


const { setTokenCookie } = require('../../utils/auth');
const db = require('../../models');
const User = db.User


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Please provide a username with at least 5 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post(
    '/signup',
    validateSignup,
    asyncHandler(async (req, res) => {

        const { email, password, username } = req.body;

        const checkEmailExists = await User.findOne({ where: { emailLower: email.toLowerCase() } })
        const checkUsernameExists = await User.findOne({ where: { usernameLower: username.toLowerCase() } })

        if (checkEmailExists || checkUsernameExists) {
            return
        }

        const user = await User.signup({ email, username, password });
        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get('/:userId',
    asyncHandler(async (req, res) => {
        const { userId } = req.params
        const user = await User.findOne({ where: { id: userId } })
        return res.json(user)
    }))

router.get('/',
    asyncHandler(async (req, res) => {
        const users = await User.findAll()
        return res.json(users)

    }))

router.put('/:userId',
    awss3.singleMulterUpload('image'),
    asyncHandler(async (req, res) => {
        const { userId } = req.params
        const { summary } = req.body
        const imageURL = await awss3.singlePublicFileUpload(req.file)

        const user = await User.findOne({ where: { id: userId } })
        if (summary) {
            user.summary = summary
        }
        if (imageURL) {
            user.image = imageURL
        }
        await user.save()
        return res.json(user)

    })

)
module.exports = router;
