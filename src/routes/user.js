const { userControllers, userDataControllers } = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.get("/", userControllers.get); 
userRouter.post("/", userDataControllers.post); 

module.exports = userRouter;
