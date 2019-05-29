const express = require('express');
const WishList = require('../models/wishlist');
const routes = express.Router();
const auth = require('../middleware/auth');

//create wish route
routes.post('/wishlist', auth, async (req, res) => {
    try {
        const wish = new WishList({
            ...req.body,
            wishedBy: req.profile._id
        })

        await wish.save()
        res.status(201).send(wish)
    } catch (e) {
        res.status(400).send(e)
    }
})

routes.get('/wishlist/', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const wish = await WishList.findOne({
        //     _id,
        //     wishedBy: req.profile._id
        // })
        
        // const wishList = await req.profile.populate('wishList').execPopulate()
        const { status, limit, skip, sortAt, order } = req.query
        // console.log(typeof status, status, 'status');
        
        const match = {}
        if(status){
            match.status = (status) === "true"
        }
        const sort = {}
        if(sortAt){
            sort[sortAt] = (order === 'desc') ? -1 : 1
        }
        const wishList = await req.profile.populate({
            path: 'wishList',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate()
        if(!wishList){
            res.status(404).send('No wishlist found!')
        }

        res.send(wishList)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = routes