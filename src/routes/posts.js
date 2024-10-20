const express = require("express");
const postsControllers = require("../controllers/posts");
const postsRouter = express.Router();

postsRouter.get("/", postsControllers.get);

postsRouter.get("/post/:username", postsControllers.getPostsByUsername);


module.exports = postsRouter;
