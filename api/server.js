const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");
const howToRouter = require("../howto/howto-router");
// const checkRole = require("../auth/check-role-middleware")

const server = express();

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: "*",
    credentials: true, // works in tandem with the withCredentials option
  })
);

server.use("/", authRouter);
server.use("/user", userRouter);
server.use('/howto', howToRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
