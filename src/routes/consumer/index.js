'use strict';

const express = require('express');
const router = express.Router();

const userController = require('./User/userController');

router.get('/login', userController.login); //로그인 API
router.get('/logout', userController.logout); //로그아웃 API

module.exports = router;
