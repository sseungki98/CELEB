'use strict';

const express = require('express');
const router = express.Router();
// const jwtMiddleware = require('../../../config/jwtMiddleware');
// const userController = require('./User/userController');

const userController = require('./user.controller');
router.get('/', userController.output.main);
router.get('/login', userController.output.login); //로그인 페이지
router.post('/login', userController.process.login); //로그인 API

// router.get('/login', userController.login); //로그인 API
// router.get('/logout', jwtMiddleware, userController.logout); //로그아웃 API
// router.get('/sign-up', userController.signUp); //회원가입 API
module.exports = router;
