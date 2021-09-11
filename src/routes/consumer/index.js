'use strict';

const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../../../config/jwtMiddleware');
const userController = require('./User/userController');

router.get('/login', userController.login); //로그인 API
router.get('/logout', jwtMiddleware, userController.logout); //로그아웃 API
router.get('/sign-up', userController.signUp); //회원가입 API
module.exports = router;
