const express = require("express");
const app = express();
const {db} =require("./db")
 require('dotenv').config();
 const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

const userroute = require('./route/user');
const adminroute = require('./route/admin');

// Correctly use the routes directly with `app`
app.use('/user', userroute);
app.use('/admin', adminroute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
