const express=require("express")
const route=express.Router()
const ctl=require("../controller/Adminctl")

route.post("/login",ctl.adminLogin)
module.exports=route