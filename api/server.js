const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");
const howToRouter = require("../howto/howto-router");
const stepsToRouter = require("../steps/steps-router");
const requiresToken = require('../auth/restricted-middleware')

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
server.use("/user", requiresToken, userRouter);
server.use('/howto', requiresToken, howToRouter)
server.use('/steps', requiresToken, stepsToRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
