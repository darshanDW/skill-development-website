const express= require('express')
const{Users,parent,Childs}=require('../models/user')
const {auth_middleware}=require('./middleware')
const { user } = require('pg/lib/defaults')
const router= express.Router()


router.get('/all_user',auth_middleware,(req,res)=>{
    try{
        const users= Users.findOne({})
        res.json({
            msg:"User sent successfully",
            User:users
        })
    }
    catch(error){
        res.status(400).json()({
            msg:"Error while getting users"
        })
    }
})


module.exports = router;

