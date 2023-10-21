const mongoose=require('mongoose')
const favourateSchema=mongoose.Schema({
    image:String,
    instructions:String,
    pricePerServing:Number,
    readyInMinutes:Number,
    summary:String,
    title:String,
    vegan:Boolean,
    vegetarian:Boolean,
    veryHealthy:Boolean,
    veryPopular:Boolean,
    userId:String,
    id:Number,

})
const favorateModel=mongoose.model("favorates",favourateSchema)
module.exports={favorateModel}