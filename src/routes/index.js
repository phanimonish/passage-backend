const { User } = require("../models/user");
const authRouter = require("./auth");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const userRouter = require("./user");
const postRouter = require("./post");
const postsRouter = require("./posts");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) return res.status(401).send();

    console.log({ token }, "Token from headers");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send();

    console.log({ decoded }, "Token decoded");

    const user = await User.findById(decoded?.user);
    if (!user) return res.status(401).send();

    req.user = user;

    console.log(req.user);

    next();
  } catch (err) {
    console.log({ err, req, res });
    res.status(401).send(err);
  }
};

router.use("/auth", authRouter);
router.use("/user", verifyToken, userRouter);
router.use("/post", postRouter);
router.use("/posts", postsRouter);

module.exports = router;
