'use strict';

const User = require('../../models/User/User');

const output = {
  main: (req, res) => {
    res.render('consumer/main');
  },
  login: (req, res) => {
    res.render('consumer/login');
  },
  myPage: (req, res) => {
    if (req.session.user) {
      const email = req.session.user.email;
      const user = new User(req.body);
      const response = await user.myPage(email);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.success) {
      req.session.user = {
        email: req.body.email,
        nickname: response.nickname,
        authorized: true,
      };
    }
    return res.json(response);
  },
  logout: async (req, res) => {
    if (req.session.user) {
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.redirect('consumer/login', { success: true, message: '로그아웃에 성공하였습니다.' });
      });
    } else {
      return res.redirect('consumer/login', { success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
  signUp: async (req, res) => {
    const user = new User(req.body);
    const response = await user.signUp();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
