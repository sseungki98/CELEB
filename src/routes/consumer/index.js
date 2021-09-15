'use strict';

const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
router.get('/', userController.output.main);
router.get('/login', userController.output.login);
router.post('/login', userController.process.login);

module.exports = router;
