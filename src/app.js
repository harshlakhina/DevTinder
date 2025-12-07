const express=require("express");
const connectDB=require("./config/database");
const app=express();


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
