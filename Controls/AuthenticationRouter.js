const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { AuthenticationModel } = require("../Models/AuthenticationModel")

const authRouter=express.Router()

authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    // console.log(email)
const data=await AuthenticationModel.findOne({email})
// console.log(data)
if(data){
    res.status(400).json({msg:"This User Is Already Registered"})
}else{
 try{

 bcrypt.hash(password,5, async(err, hash)=> {
        // Store hash in your password DB.
        if(hash){
            const data=new AuthenticationModel({email,name,password:hash})
            await data.save()
            res.status(200).json({msg:"Registered Successfully"})
        }else{

           
            res.status(400).json({msg:"Something going wrong"})
        }
    });
}catch(err){
    res.status(400).json({msg:"something Going Wrong"})
}}
})
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const data=await AuthenticationModel.findOne({email})
    if(data){
        bcrypt.compare(password, data.password, function(err, result) {
          if(result){
            var token = jwt.sign({ userId:data._id }, 'masai');
            res.status(200).json({msg:"Login Successfully",token,username:data.name,useremail:data.email})
          }else{
            res.status(400).json({msg:"Wrong password"})
          }
        });
    }else{
        res.status(400).json({msg:"No Data Found"})
    }
})
module.exports={authRouter}