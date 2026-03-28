const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const { createServer } = require("http");
const cookieParser = require("cookie-parser");

require("dotenv").config();

require("./Utils/cron-job");

const authRouter = require("./Routes/Auth");
const profileRouter = require("./Routes/Profile");
const requestRouter = require("./Routes/Request");
const userRouter = require("./Routes/User");
const paymentRouter = require("./Routes/payment");
const chatRouter = require("./Routes/chat");

const initializeSocket = require("./Utils/socket");

app.use(
  express.json({
    verify: (req, res, buff) => {
      if (req.originalUrl === "/webhook") req.rawBody = buff;
    },
  }),
);
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
app.use("/",chatRouter);

const server = createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("database connection established");

    server.listen(process.env.PORT || 8080, () => {
      console.log("server is listening on port 8080");
    });
  })
  .catch(() => {
    console.error("database connection failed");
  });
