const express = require('express')
const { Users, Parents, Childs } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const router = express.Router();
router.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await Users.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ msg: "USER ALREADY EXISTS" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create and save the parent object
        const parent = new Parents({
            name: req.body.parent.name,
            profession: req.body.parent.profession,
            phone_number: req.body.parent.phone_number,
            address: req.body.parent.address
        });
        await parent.save();

        // Create and save the child object
        const child = new Childs({
            name: req.body.child.name,
            DOB: req.body.child.DOB,
            hobbies: req.body.child.hobbies,
            school_name: req.body.child.school_name,
            class: req.body.child.class
        });
        await child.save();

        // Create the new user with parent and child references
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            parent: parent,
            child: child
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error", error });
    }
});


router.post('/signin', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User not registered" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ msg: "Signin successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});
module.exports = router;
