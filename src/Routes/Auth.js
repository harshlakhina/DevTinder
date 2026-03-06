const express=require("express");
const {validateSignup}=require("../Utils/validations");
const bcrypt=require("bcrypt");
const User=require("../Models/User");
const jwt=require("jsonwebtoken");


const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{

   try{
    
    validateSignup(req);
    const {password,firstName,lastName,emailId}=req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user=new User({
        firstName,
        lastName,
        emailId,
        password:hashedPassword
    });
    const data=await user.save();
    res.status(201).send("user created succesddfully");

   }
   catch(err){
    res.status(400).send("failed to save user:"+err.message);
   }

});

authRouter.post("/login",async (req,res)=>{
  const {password,emailId}=req.body;
  const user=await User.findOne({emailId:emailId});

  try{
    if(!user){
       throw new Error("user is not registered");
    }

    const isPasswordValid=await user.comparePassword(password);

    if(!isPasswordValid){
        throw new Error("Invalid credentials");
    }

     const token=await user.getJWT();
        
     res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
     res.json({message:"user logged in succesfully",user})
    
  }
  catch(err){
    console.log(err);
    res.status(400).send("ERROR :"+err.message);
  }


});

authRouter.post("/logout",(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now())})
  .send("Logout successfull!!");

})

module.exports=authRouter;