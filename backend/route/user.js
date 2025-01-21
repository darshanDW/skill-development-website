const express = require('express');
const { Users, Parents, Childs } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const router = express.Router();
const { auth_middleware } = require('./middleware')

// Sign-up Route

router.post('/signup', async (req, res) => {
    try {
        // Log the incoming request for debugging
         console.log(req.body);

        // Destructure request body to extract the required fields
        const { email, username, password, parentName, mobileNo, childName, schoolName, city, className, hobbies, otherHobby, dateOfBirth, age } = req.body;

        // Validation: Check if required fields are provided
        if (!username || !email || !password || !parentName || !mobileNo || !childName || !dateOfBirth || !schoolName || !className) {
            console.log(username)
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if user already exists by email or username
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ msg: "Username or Email already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Parent and Child records
        const parent = new Parents({
            name: parentName,
            phone_number: mobileNo,
        });

        const child = new Childs({
            name: childName,
            DOB: dateOfBirth,  // Use the correct field name as in the frontend
            hobbies: hobbies || [],  // Use hobbies if provided, default to an empty array
            otherHobby,  // Save the "other hobby" if provided
            school_name: schoolName,
            city,  // Save the city
            class: className,
            age,  // Save age if provided
        });

        // Save parent and child records to MongoDB
        await Promise.all([parent.save(), child.save()]);

        // Create a new user and save the references to parent and child objects
        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            parent: parent._id,  // Store parent ID
            child: child._id,  // Store child ID
        });

        await newUser.save();

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with a success message and the token
        res.status(201).json({ msg: "User created successfully", token });
        res.end();
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
});

// Sign-in Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Check if a user with the provided email exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not registered" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid password" });
        }
        
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        // Respond with a success message and the token
        res.json({ msg: "Signin successful", token });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
});

router.get('/profile', auth_middleware, async (req, res) => {
    try {

        const userId = req.userid
        const user = await Users.findById(userId)
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }
        const child_id = user.child
        const child = await Childs.findById(child_id)
        if (!child) {
            return res.status(400).json({ msg: "Child not found" })
        }

        return res.status(200).json({
            msg: "get profile", child
        })


    } catch (err) {
        // console.log(err)
        res.status(500).json({ msg: "Server error in /profile", err });

    }


})


module.exports = router;
