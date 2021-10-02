'use strict';

const express = require('express');
const router = express.Router();

const storeController = require('./store.controller');
const hostController = require('./host.controller');

router.get('/register', storeController.output.register); //스토어 회원가입 페이지

router.post('/register', hostController.process.register); //회원가입
router.post('/login', hostController.process.login); //스토어 로그인

module.exports = router;
