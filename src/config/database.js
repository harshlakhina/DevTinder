
const mongoose=require("mongoose");

const connectDB=async()=>{
   await mongoose.connect("mongodb+srv://lakhinaharsh064_db_user:oof1ckFQg537eFcg@cluster0.g8t3j3v.mongodb.net/devTinder");
};

module.exports=connectDB;
