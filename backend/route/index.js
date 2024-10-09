const express =require("express")
const userroute =require('./user')
const adminroute =require('./admin')
const router =express.Router()

const app=express()
router.use('/user',userroute);
router.use('/admin',adminroute);

module.exports= router