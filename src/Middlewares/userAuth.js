const jwt=require("jsonwebtoken");
const User=require("../Models/User");

const userAuth=async (req,res,next)=>{   
    try{
        const {token}=req.cookies;
    
    if(!token){
        return res.status(401).send("User not logged in")
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
    res.status(401).send("ERROR:"+err.message);
   }
}

module.exports={userAuth};