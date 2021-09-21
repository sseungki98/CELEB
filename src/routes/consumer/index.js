'use strict';

const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
//Page Info Router
router.get('/', userController.output.main); //메인화면 페이지 요청
router.get('/login', userController.output.login); //로그인 페이지 요청
//User Info Router
router.post('/login', userController.process.login); //로그인
router.post('/logout', userController.process.logout); //로그아웃
router.post('/register', userController.process.register); //회원가입
router.get('/my-page', userController.output.myPage); //마이페이지 조회
//Store Info Router
module.exports = router;
