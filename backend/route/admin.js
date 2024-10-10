const express = require('express')
const { Users, Parents, Childs } = require('../models/user')
const { auth_middleware } = require('./middleware')
const { user } = require('pg/lib/defaults')
const router = express.Router()


router.get('/all_user', auth_middleware, (req, res) => {
    try {
        const users = Users.find({}).lean()
        res.json({ msg: "get all user", users });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "Error while getting users"
        })
    }
})


module.exports = router;

