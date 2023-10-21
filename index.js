const express = require('express');
const cors=require('cors');
const { connection } = require('./Models/AuthenticationModel');
const { authRouter } = require('./Controls/AuthenticationRouter');
const { favouraterouter } = require('./Controls/FavourateRouter');
const { auth } = require('./Middleware/auth');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
// Define your routes here
app.get("/",(req,res)=>{
  res.status({msg:"Welcome To Database"})
})

app.use("/user",auth, authRouter)
app.use("/favourate",favouraterouter)
app.listen(port, async() => {
try{
await connection
console.log("connected to mongodb")
}catch(err){
  console.log(err)
}
console.log(`server is runninng on port ${port}`)
});
