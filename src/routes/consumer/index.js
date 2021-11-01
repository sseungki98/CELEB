'use strict';

const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const storeController = require('./store.controller');
const inquiryController = require('./inquiry.controller');
const reviewController = require('./review.controller');
const orderController = require('./order.controller');
const productController = require('./product.controller');

//Page Info Router
router.get('/', storeController.output.popularStore); //메인화면 페이지 요청
//User Info Router
router.get('/login', userController.output.login); //로그인 페이지 요청
router.get('/register', userController.output.register); //회원가입 페이지 요청
router.post('/login', userController.process.login); //로그인
router.post('/logout', userController.process.logout); //로그아웃
router.post('/register', userController.process.register); //회원가입
router.get('/mypage', userController.output.myPage); //마이페이지 조회
router.get('/mypage/personal-information', userController.output.personalInformation); //개인정보 변경 페이지 조회
router.post('/mypage/personal-information', userController.process.personalInformation); //개인정보 수정
//Store Info Router
router.get('/store/:storeId', storeController.output.storeDetail); //각 스토어별 페이지 조회
router.get('/category/:categoryId', storeController.output.storeList); //카테고리별 스토어 리스트 조회
router.get('/search', storeController.output.searchStore); //스토어 통합 검색
//Inquiry Info Router
router.post('/store/:storeId/inquiry', inquiryController.process.inquiry); //문의 생성
router.get('/store/:storeId/inquiry', inquiryController.output.inquiryDetail); //스토어별 문의 내용 조회 → 수신/발신 체크
router.get('/inquiry', inquiryController.output.inquiryList); //나의 문의 내역 조회 → 문의한 스토어 리스트
//Order Info Router
router.post('/cart', orderController.process.cart); //장바구니 담기
router.get('/cart', orderController.output.cart); //장바구니 조회
router.post('/store/:storeId/product/:productId/order', orderController.process.order); //주문하기
router.get('/order/:orderId', orderController.output.order); //주문 확인 조회 → 주문 완료 직후
//Product Info Router
router.get('/store/:storeId/product/:productId', productController.output.productDetail); // 상품 디테일 조회
//Review Info Router
router.get('/mypage/order/:orderId/review', reviewController.output.review); // 리뷰 작성 페이지 가져오기
router.post('/mypage/order/:orderId/review', reviewController.process.review); //스토어 리뷰 작성하기
router.patch('/review/:reviewId', reviewController.process.patchReview); //스토어 리뷰 삭제하기
router.get('/store/:storeId/review', reviewController.output.storeReview); //스토어 리뷰 조회

module.exports = router;
