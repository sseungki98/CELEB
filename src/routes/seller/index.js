'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

const storeController = require('./store.controller');
const hostController = require('./host.controller');
const orderController = require('./order.controller');
const reviewController = require('./review.controller');
const productController = require('./product.controller');
const inquiryController = require('./inquiry.controller');

//Page Info Router
router.get('/register', storeController.output.register); //스토어 회원가입 페이지
router.get('/register/licenseNum', storeController.output.licenseNum); //사업자 등록번호 조회 페이지
router.get('/store/storePage', storeController.output.storePage); //내 스토어 정보 조회 페이지
//Store Host Info Router
router.post('/register', upload.single('uploadImage'), hostController.process.register); //회원가입
router.post('/login', hostController.process.login); //스토어 로그인
router.post('/logout', hostController.process.logout); //스토어 로그아웃
router.post('/register/licenseNum', storeController.process.licenseNum); //사업자 등록번호 조회
router.post('/store/storePage', storeController.process.storePage); //스토어 상세정보 수정
//Order Info Router
router.patch('/order-status', orderController.process.orderStatus); //주문 상황 변경(승인or거절→주문확정→제작완료→픽업대기→픽업완료)
router.get('/total-order', orderController.output.order); //주문 내역 리스트 조회 → pagenation
router.get('/order/:orderId', orderController.output.orderDetail); //주문 상세 확인 (옵션, 도안, 요구사항)
//Review Info Router
router.get('/review', reviewController.output.review); //스토어 리뷰 조회
router.get('/review/reply', reviewController.output.reviewReply); //스토어 리뷰 답변 조회
router.post('/review/reply', reviewController.process.reviewReply); //스토어 리뷰 답글 작성
//Product Info Router
router.get('/store/product', productController.output.productList); //내가 등록한 상품 리스트 조회
router.get('/store/product/productDetail', productController.output.productDetail); //등록 상품 자세히 조회
//Inquiry Info Router
router.get('/inquiry', inquiryController.output.inquiry); //스토어 문의 목록 조회
module.exports = router;
