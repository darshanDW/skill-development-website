const express = require('express')
const {Users, Parents, Childs } = require('../models/user')
const{Admins}=require('../models/admin')
const { auth_middleware } = require('./middleware')
const bcrypt = require('bcrypt');
const router = express.Router()
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

router.post('/signin', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Check if a user with the provided email exists
        const Admin = await Admins.findOne({email:email });
        if (!Admin) {
            return res.status(400).json({ msg: "Admin not found" });
        }

        console.log(Admin)
        console.log("pass")
        // Compare the provided password with the stored hashed password
        console.log(password ,Admin.password)
        const isPasswordValid = await bcrypt.compare(password, Admin.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Generate a JWT token for the admin
        const token = jwt.sign({ AdminId: Admin._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with a success message and the token
        res.json({ msg: "Signin successful", token });
    
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
});

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


router.post('/upload_file',auth_middleware,(req,res)=>{
try {
    
} catch (error) {
    
}
})



module.exports = router;

