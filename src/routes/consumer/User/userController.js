'use strict';

const userService = require('./userService');
//1. 로그인
const login = (req, res) => {
  const { email, password } = req.body;
  res.render(userService.userLogin(email, password));
};
//2. 로그아웃
const logout = (req, res) => {
  const email = req.body;
  res.render(userService.userLogout(email));
};
//3. 회원가입
const signUp = (req, res) => {
  const { email, password, name, phoneNumber, address } = req.body;
  res.render(userService.userSignUp(email, password, name, phoneNumber, address));
};
module.exports = {
  login,
  logout,
  signUp,
};
