const express=require("express");
const connectDB=require("./config/database");
const app=express();
const cookieParser=require("cookie-parser");

const authRouter=require("./Routes/Auth");
const profileRouter=require("./Routes/Profile");
const requestRouter=require("./Routes/Request");
const userRouter = require("./Routes/User");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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



