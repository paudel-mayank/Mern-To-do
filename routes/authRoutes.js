
const router = require('express').Router();
const { signUp, login } = require('../controller/authController');

router.post('/signup',signUp).post("/login",login);

module.exports =router;