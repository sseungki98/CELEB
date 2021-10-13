'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

const storeController = require('./store.controller');
const hostController = require('./host.controller');
const orderController = require('./order.controller');
const reviewController = require('./review.controller');

//Page Info Router
router.get('/register', storeController.output.register); //스토어 회원가입 페이지
router.get('/licenseNum', storeController.output.licenseNum); //사업자 등록번호 조회 페이지
//Store Host Info Router
router.post('/register', hostController.process.register); //회원가입
router.post('/login', hostController.process.login); //스토어 로그인
router.post('/logout', hostController.process.logout); //스토어 로그아웃
router.post('/register/licenseNum', storeController.process.licenseNum); //사업자 등록번호 조회
router.post('/register/uploadImage', upload.single('uploadImage'), hostController.process.uploadImage); //이미지 업로드
router.post('/store/storePage', storeController.process.storePage); //스토어 상세정보 수정
//Order Info Router
router.patch('/order-status', orderController.process.orderStatus); //주문 상황 변경(승인or거절→주문확정→제작완료→픽업대기→픽업완료)
router.get('/total-order', orderController.output.order); //주문 내역 리스트 조회 → pagenation
router.get('/order/:orderId', orderController.output.orderDetail); //주문 상세 확인 (옵션, 도안, 요구사항)
//Review Info Router
router.get('/review', reviewController.output.review); //스토어 리뷰 조회
router.get('/review/reply', reviewController.output.reviewReply); //스토어 리뷰 답변 조회
module.exports = router;
