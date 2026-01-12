const express=require("express");
const { userAuth } = require("../Middlewares/userAuth");
const ConnectionRequest = require("../Models/ConnectionRequest");

const userRouter=express.Router();
const USER_SAFE_DATA=["firstName","lastName","skills","age","photoUrl","gender"];

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA);

        res.json({message:"data fetched succesfully",data:connectionRequest});
        
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"acecpted"}
            ]
          })
          .populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA)

          const data=connectionRequest.map((field)=>{
              if(field.toUserId.equals(loggedInUser._id)){
                return field.fromUserId;
              }

              return field.toUserId
           })

           res.json({data})

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})


module.exports=userRouter