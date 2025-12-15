const express=require("express");
const connectDB=require("./config/database");
const User=require("./Models/User");
const { use } = require("react");
const app=express();

app.use(express.json());

app.post("/signup",async (req,res)=>{

   const cust=new User(req.body);
   
   try{
   let bye=await cust.save();
   console.log(bye);
   res.status(201).send("user created succesddfully");
   }
   catch(err){
    console.log(err);
    res.status(400).send("failde to save user");
   }
});


app.get("/feed",async (req,res)=>{
    try{
        const users=  await User.find({});
        if(users.length===0){
            res.status(404).send("user not found");
        }
        else {
            res.send(users);
        }

    }
    catch(err){
        res.send("something went wrong");
    }

})

app.delete("/user",async (req,res)=>{
    let userId=req.body.userId;
    try{
        let deleteduser=await User.findByIdAndDelete(userId);
        res.status(200).send("user deleted successfully");
    }
    catch(err){
        res.status(500).send("something went wrong");
    }
})

app.patch("/user/:userId",async (req,res)=>{
    let userId=req.params.userId;
    let data=req.body;
    try{
       let ALLOWED_UPDATES=["gender","age","about","skills","photoUrl","password"];

       let isAllowedUpdate=Object.keys(data).every((ele)=>ALLOWED_UPDATES.includes(ele));
       if(!isAllowedUpdate){
           throw new Error("Update not allowed");
       }


       if(data?.skills){
         if(data.skills.length>10)  throw new Error("skills cannot more than 10");
       }

       
       let updatedUser= await User.findByIdAndUpdate(userId,data, {
        returnDocument:'after',
        runValidators:true,
    });
       console.log(updatedUser);
       res.status(200).send("user updated successfully");
    }
    catch(err){
       res.status(500).send("Update Failed :"+" "+err.message);
    }
})

connectDB()
.then(()=>{
    console.log("database connection established");

        app.listen(8080,()=>{
            console.log("server is listening on port 8080");
        });
})
.catch(()=>{
    console.error("database connection failed");
});



