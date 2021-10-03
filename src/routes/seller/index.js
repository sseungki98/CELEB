'use strict';

const express = require('express');
const router = express.Router();

const storeController = require('./store.controller');
const hostController = require('./host.controller');

//Page Info Router
router.get('/register', storeController.output.register); //스토어 회원가입 페이지
router.get('/licenseNum', storeController.output.licenseNum); //사업자 등록번호 조회 페이지
//Store Host Info Router
router.post('/register', hostController.process.register); //회원가입
router.post('/login', hostController.process.login); //스토어 로그인
router.post('/logout', hostController.process.logout); //스토어 로그아웃
router.post('/licenseNum', storeController.process.licenseNum); //사업자 등록번호 조회
router.post('/store/storePage', storeController.process.storePage); //스토어 상세정보 수정
module.exports = router;
