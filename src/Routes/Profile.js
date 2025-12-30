const express=require("express");
const {userAuth}=require("../Middlewares/userAuth");
const  {validateEditProfileData} =require("../Utils/validations");


const profileRouter=express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{

    try{
         const userProfile=req.user;
        res.send(userProfile);
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }

});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid update fields");
        }

        const LoggedInUser=req.user;

        Object.keys(req.body).forEach((key)=>LoggedInUser[key]=req.body[key]);

        await LoggedInUser.save();

        res.json({message:"user updated succesfully",data:LoggedInUser});
    }
    catch(err){
        res.send("ERROR "+err.message);
    }
})

module.exports=profileRouter;