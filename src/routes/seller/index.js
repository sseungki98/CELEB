'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');

const storeController = require('./store.controller');
const orderController = require('./order.controller');
const reviewController = require('./review.controller');
const productController = require('./product.controller');
const inquiryController = require('./inquiry.controller');

//Page Info Router
router.get('/', storeController.output.main); //판매자 페이지 메인화면
//Store Info Router
router.get('/login', storeController.output.login); //로그인 페이지
router.get('/register', storeController.output.register); //스토어 회원가입 페이지
router.post('/register', upload.single('uploadImage'), storeController.process.register); //회원가입
router.post('/login', storeController.process.login); //스토어 로그인
router.post('/logout', storeController.process.logout); //스토어 로그아웃
router.post('/register/licenseNum', storeController.process.licenseNum); //사업자 등록번호 조회
router.get('/store', storeController.output.storeDetail); //내 스토어 정보 조회 페이지
router.post('/store/update', upload.single('uploadImage'), storeController.process.updateStore); //스토어 상세정보 수정
//Order Info Router
router.patch('/order/:orderId', orderController.process.orderStatus); //주문 상황 변경(승인or거절→주문확정→제작완료→픽업대기→픽업완료)
router.get('/order', orderController.output.order); //주문 내역 리스트 조회 → pagenation
router.get('/sales', orderController.output.salesAccount); // 정산 조회
//Review Info Router
router.get('/review', reviewController.output.review); //스토어 리뷰 조회
router.post('/review/:reviewId/reply', reviewController.process.reviewReply); //스토어 리뷰 답글 작성
//Product Info Router
router.get('/product/regist', productController.output.registProduct); // 상품 등록 페이지
router.get('/product', productController.output.productList); //내가 등록한 상품 리스트 조회
router.get('/product/:productId', productController.output.productDetail); //등록 상품 자세히 조회
router.post(
  '/product/regist',
  upload.fields([
    { name: 'productMain', maxCount: 1 },
    { name: 'productDetail', maxCount: 5 },
  ]),
  productController.process.createProduct,
); //상품 등록하기 -> from 구조
router.patch(
  '/product/:productId/update',
  upload.fields([
    { name: 'productMain', maxCount: 1 },
    { name: 'productDetail', maxCount: 5 },
  ]),
  productController.process.updateProduct,
); //상품 수정하기
router.patch('/product/:productId/delete', productController.process.deleteProduct); //상품 삭제하기
//Inquiry Info Router
router.get('/inquiry', inquiryController.output.inquiry); //스토어 문의 목록 조회
router.get('/inquiry/user/:userId', inquiryController.output.inquiryDetail); //사용자 문의 내용
router.post('/inquiry/user/:userId', inquiryController.process.inquiry); //문의 답변 작성
module.exports = router;
