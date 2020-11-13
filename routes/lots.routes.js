const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/User')
const Lot = require('../models/Lot')

router.post('/create', verify, async (req, res) => {
    const user = await User.findById(req.user._id)

    const lot = new Lot({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
        author: user.username,
        bets: []
    })

    try {
        await lot.save()
        res.status(200).json({message: 'Lot has been created!'})
    } catch (e) {
        res.status(400).json({message: e})
    }
})

router.post('/update/:_id&:author', verify, async (req, res) => {
    const lot = await Lot.findById(req.params._id)

    //console.log(req.params.author)

    await Lot.findByIdAndUpdate(req.params._id, {
        bets: [...lot.bets, {
            amount: req.body.bet,
            author: req.params.author
    }],
        price: req.body.bet
    })
    const updatedLot = await Lot.findById(req.params._id)
    res.status(200).json({
        message: 'Lot has been updated',
        updatedLot
    })
})

router.get('/get', async (req, res) => {
    const lots = await Lot.find()
    res.status(200).json(lots)
})

router.get('/get/:_id', async (req, res) => {
    const lot = await Lot.findById(req.params._id)
    res.status(200).json(lot)
})

module.exports = router
