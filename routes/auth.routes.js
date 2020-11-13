const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validation')

require('dotenv').config()

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).json({message: error.details[0].message})

    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).json({message: 'Email already exists'})

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    })

    try {
        await user.save()
        res.status(200).json({message: 'User has been created!'})
    } catch (e) {
        res.status(400).json({message: e})
    }
})

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).json({message: error.details[0].message})

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({message: 'Wrong data provided'})

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({message: 'Wrong data provided'})

    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    res.header('auth-token', token)

    res.status(200).json({token, username: user.username})
})

module.exports = router
