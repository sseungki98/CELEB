'use strict';

const User = require('../../models/User/User');

const output = {
  main: (req, res) => {
    res.render('consumer/main');
  },
  login: (req, res) => {
    res.render('consumer/login');
  },
  myPage: async (req, res) => {
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
  register: async (req, res) => {
    if (!req.body.email) return res.json({ success: false, message: '이메일을 입력해주세요.' });
    if (!req.body.password) return res.json({ success: false, message: '비밀번호를 입력해주세요.' });
    if (!req.body.name) return res.json({ success: false, message: '이름을 입력해주세요.' });
    if (!req.body.phoneNum) return res.json({ success: false, message: '핸드폰 번호를 입력해주세요.' });
    if (!req.body.address) return res.json({ success: false, message: '주소를 입력해주세요.' });
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
  inquiry: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const storeId = req.params.storeId;
      const productId = req.params.productId;
      const { type, contents } = req.body;
      if (!type) return res.json({ success: false, message: '문의 유형을 입력해주세요. ' });
      if (!contents) return res.json({ success: false, message: '문의 내용을 입력해주세요. ' });
      const user = new User(req.body);
      const response = await user.inquiry(id, storeId, productId, type, contents);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

module.exports = {
  output,
  process,
};
