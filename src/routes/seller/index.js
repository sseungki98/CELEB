'use strict';

const express = require('express');
const router = express.Router();

const storeController = require('./store.controller');
const hostController = require('./host.controller');
const orderController = require('./order.controller');

//Page Info Router
router.get('/register', storeController.output.register); //스토어 회원가입 페이지
router.get('/licenseNum', storeController.output.licenseNum); //사업자 등록번호 조회 페이지
//Store Host Info Router
router.post('/register', hostController.process.register); //회원가입
router.post('/login', hostController.process.login); //스토어 로그인
router.post('/logout', hostController.process.logout); //스토어 로그아웃
router.post('/licenseNum', storeController.process.licenseNum); //사업자 등록번호 조회
router.post('/store/storePage', storeController.process.storePage); //스토어 상세정보 수정
//Order Info Router
router.patch('/order-status', orderController.process.orderStatus); //주문 상황 변경(승인or거절→주문 확정→제작완료→픽업대기→픽업완료)
module.exports = router;
