'use strict';

const userService = require('./userService');

const login = (req, res) => {
  const { email, password } = req.body;
  res.render(userService.userLogin(email, password));
};

const logout = (req, res) => {
  res.render(userService.userLogout);
};
module.exports = {
  login,
  logout,
};
