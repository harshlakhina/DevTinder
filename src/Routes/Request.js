const express=require("express");
const ConnectionRequest=require("../Models/ConnectionRequest");
const { userAuth } = require("../Middlewares/userAuth");
const User=require("../Models/User");

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const ALLOWED_STATUS=["ignored","interested"];

        if(!ALLOWED_STATUS.includes(status)){
            throw new Error(`${status} is not a valid status type`);
        }

        const existingUser=await User.findById(toUserId);
        if(!existingUser){
           return res.status(404).json({message:"User not found!"})
        }

        const existingRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })

        if(existingRequest){
            throw new Error("connection request already exists!")
        }
        
        const connectionrequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data=await connectionrequest.save();
        res.json({message:status==='ignored'?`${req.user.firstName} ${status} ${existingUser.firstName}`:`${req.user.firstName} is ${status} in ${existingUser.firstName}`,data});
    }
    catch(err){
        res.status(400).json({message:`ERROR:${err.message}`});
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const ALLOWED_STATUS=["accepted","rejected"];
        const {status,requestId}=req.params

        if(!ALLOWED_STATUS.includes(status)){
            return res.status(400).json({message:"Inavlid Status Type"});
        }

        const connectionRequest=await ConnectionRequest.findOne({
            status:"interested",
            _id:requestId,
            toUserId:loggedInUser._id
        });

        if(!connectionRequest){
            return res.status(404).json({message:"connection Request not found"})
        }

        connectionRequest.status=status;

        const data=await connectionRequest.save();

        res.json({message:`connection request ${status}`},data);
        
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})


module.exports=requestRouter;