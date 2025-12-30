const jwt=require("jsonwebtoken");
const User=require("../Models/User");

const userAuth=async (req,res,next)=>{   
    try{
        const {token}=req.cookies;
    
    if(!token){
        throw new Error("user not loggedIn");
    }

    const {_id} =await jwt.verify(token,"Harsh@123");

    const userProfile=await User.findById(_id);

    if(!userProfile){
        throw new Error("user not found");
    }

    // adding userprofile to req object
    req.user=userProfile;

    next();
   }
   catch(err){
    res.status(400).send("ERROR:"+err.message);
   }
}

module.exports={userAuth};