const mongoose=require("mongoose")
require('dotenv').config()
const connection=mongoose.connect(process.env.MongoUrl)
const AuthenticationSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const AuthenticationModel=mongoose.model("authdata",AuthenticationSchema)
module.exports={AuthenticationModel,connection}