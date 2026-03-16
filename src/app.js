const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

require("./Utils/cron-job");

const authRouter = require("./Routes/Auth");
const profileRouter = require("./Routes/Profile");
const requestRouter = require("./Routes/Request");
const userRouter = require("./Routes/User");
const paymentRouter = require("./Routes/payment");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

connectDB()
  .then(() => {
    console.log("database connection established");

    app.listen(process.env.PORT || 8080, () => {
      console.log("server is listening on port 8080");
    });
  })
  .catch(() => {
    console.error("database connection failed");
  });
