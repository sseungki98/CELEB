'use strict';

const express = require('express');
const router = express.Router();
// const jwtMiddleware = require('../../../config/jwtMiddleware');
// const userController = require('./User/userController');

const userController = require('./user.controller');
router.get('/', userController.output.main); //메인화면 페이지 요청
router.get('/login', userController.output.login); //로그인 페이지 요청
router.post('/login', userController.process.login); //로그인 요청
router.post('/sign-up', userController.process.signUp); //회원가입 요청
module.exports = router;
