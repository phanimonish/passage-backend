const postsControllers = require("../controllers/posts");

const postsRouter = require("express").Router();

postsRouter.get("/", postsControllers.get);

module.exports = postsRouter;
