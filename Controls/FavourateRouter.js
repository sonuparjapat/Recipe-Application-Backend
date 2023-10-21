const express=require("express")
const { favorateModel } = require("../Models/FavourateModel")
const favouraterouter=express.Router()

favouraterouter.post("/add",async(req,res)=>{
    // console.log(req.body)
    const data=await favorateModel.findOne({id:req.body.id})
    if(data){
        res.status(400).json({msg:"Already present In your Favourates"})
    }else{

  
try{
const newdata=new favorateModel(req.body)
await newdata.save()
res.status(200).json({msg:'Added To Favourates'})
}catch(err){
    res.status(400).json({msg:"Something going wrong"})
}
}


})
favouraterouter.get("/get",async(req,res)=>{
    try{
const data=await favorateModel.find({userId:req.body.userId})
res.status(200).json({msg:data})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})
favouraterouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
const data=await favorateModel.findOne({_id:id})
try{
    if(data.userId==req.body.userId){
        await favorateModel.findOneAndDelete({_id:id})
        res.status(200).json({msg:"Removed from favourats"})
    }else{
        res.status(400).json({msg:"You are not authorised to do this task"})
    }
}catch(err){
    res.status(400).json({msg:"something going wrong"})
}

})
module.exports={favouraterouter}