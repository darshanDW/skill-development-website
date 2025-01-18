const express = require('express');
const { Users, Parents, Childs } = require('../models/user');
const { Admins } = require('../models/admin');
const { auth_middleware } = require('./middleware');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const Content = require('../models/content');

router.post('/signin', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const Admin = await Admins.findOne({ email: email });
        if (!Admin) {
            return res.status(400).json({ msg: "Admin not found" });
        }

        console.log(Admin);
        console.log("pass");
        console.log(password, Admin.password);
        const isPasswordValid = await bcrypt.compare(password, Admin.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign({ AdminId: Admin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ msg: "Signin successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
});

router.get('/all_user', auth_middleware, async (req, res) => {
    try {
        const users = await Users.find({}).lean();
        res.json({ msg: "get all user", users });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error while getting users" });
    }
});

router.get('/all_content', auth_middleware, async (req, res) => {
    try {
        const content = await Content.find({}).lean();
        res.json({ msg: "get all content", content });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error while getting content" });
    }
});

router.post('/upload_file', auth_middleware, async (req, res) => {
    try {
        const { subject, topic, pdf_link } = req.body;

        if (!subject || !topic || !pdf_link) {
            return res.status(400).json({ msg: "Subject, topic, and PDF link are required" });
        }

        // Check if the subject already exists
        let existingSubject = await Subject.findOne({ subject });

        if (existingSubject) {
            // Find if the topic already exists within the subject
            const existingTopic = existingSubject.topics.find(t => t.name === topic);

            if (existingTopic) {
                // Add the new PDF to the existing topic
                existingTopic.pdfs.push({ link: pdf_link, description });
            } else {
                // Add a new topic with the PDF
                existingSubject.topics.push({
                    name: topic,
                    pdfs: [{ link: pdf_link, description }],
                });
            }

            // Save the updated subject
            await existingSubject.save();
            res.json({ msg: "File uploaded and added to existing subject", subject: existingSubject });
        } else {
            // Create a new subject with the provided topic and PDF
            const newSubject = new Subject({
                subject,
                topics: [{
                    name: topic,
                    pdfs: [{ link: pdf_link, description }],
                }],
            });

            await newSubject.save();
            res.json({ msg: "File uploaded and new subject created", subject: newSubject });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error", error });
    }
});


module.exports = router;
