const express=require("express");
const { userAuth } = require("../Middlewares/userAuth");
const ConnectionRequest = require("../Models/ConnectionRequest");

const userRouter=express.Router();

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","skills","age","photoUrl","gender"]);

        res.json({message:"data fetched succesfully",data:connectionRequest});
        
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})


module.exports=userRouter