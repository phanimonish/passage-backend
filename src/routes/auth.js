const authControllers = require('../controllers/auth');

const authRouter = require('express').Router();

authRouter.post('/login', authControllers.login);
authRouter.post('/register', authControllers.register);

module.exports = authRouter;