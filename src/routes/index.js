const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const postsRouter = require("./posts");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) return res.status(401).send();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send();

    const user = await User.findOne({ _id: decoded.user });
    if (!user) return res.status(401).send();

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

router.use("/auth", authRouter);
router.use("/user", verifyToken, userRouter);
router.use("/post", postRouter);
router.use("/posts", postsRouter);

module.exports = router;
