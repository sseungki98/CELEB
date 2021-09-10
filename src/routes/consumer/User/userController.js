'use strict';

const userService = require('./userService');

const login = (req, res) => {
  const { email, password } = req.body;
  res.render(userService.userLogin(email, password));
};

const logout = (req, res) => {
  const email = req.body;
  res.render(userService.userLogout(email));
};
module.exports = {
  login,
  logout,
};
