'use strict';
const jwtMiddleware = require('../../../config/jwtMiddleware');
const userService = require('./userService');

//1. 로그인
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) res.json({ message: 'email is empty', isSuccess: false });
  if (!password) res.json({ message: 'password is empty', isSuccess: false });
  res.render(userService.userLogin(email, password));
};
//2. 로그아웃
const logout = (req, res) => {
  const email = req.verifiedToken.email;
  if (!email) res.json({ message: 'email is empty', isSuccess: false });
  res.render(userService.userLogout(email));
};
//3. 회원가입
const signUp = (req, res) => {
  const { email, password, name, phoneNumber, address } = req.body;
  if (!email) res.json({ message: 'email is empty', isSuccess: false });
  if (!password) res.json({ message: 'password is empty', isSuccess: false });
  if (!name) res.json({ message: 'name is empty', isSuccess: false });
  if (!phoneNumber) res.json({ message: 'phoneNumber is empty', isSuccess: false });
  if (!address) res.json({ message: 'address is empty', isSuccess: false });
  res.render(userService.userSignUp(email, password, name, phoneNumber, address));
};
module.exports = {
  login,
  logout,
  signUp,
};
