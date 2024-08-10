const userControllers = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.get('/', userControllers.get);

module.exports = userRouter;