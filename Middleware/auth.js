const auth=async(req,res,next)=>{
const token=req.headers.authorization
var jwt = require('jsonwebtoken');
if(token){
    try{
        jwt.verify(token.split(" ")[1], 'masai', function(err, decoded) {
 if(decoded){
    req.body.userId=decoded.userId
    next()
 }else{
    res.status(400).json({msg:"wrongtoken/tokenexpired"})
 }
          });
    }catch(err){
        res.status(400).json({msg:"something going wrong"})
    }
}else{
    res.status(400).json({msg:"please login first"})
}
}
module.exports={auth}