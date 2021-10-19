'use strict';

const OrderStorage = require('../../models/consumer/Order/OrderStorage');
const User = require('../../models/consumer/User/User');
const UserStorage = require('../../models/consumer/User/UserStorage');

const output = {
  login: (req, res) => {
    res.render('consumer/login');
  },
  register: (req, res) => {
    res.render('consumer/register');
  },
  myPage: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const myPageDetail = await UserStorage.getMyPageInfo(userId);
        const orderList = await OrderStorage.getMyOrder(userId);
        res.render('consumer/mypage', { myPageDetail, orderList });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
  personalInformation: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const myPageDetail = await UserStorage.getMyPageInfo(userId);
        res.render('consumer/mypage/personal-information', { myPageDetail });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();

    if (response.success) {
      req.session.user = {
        id: response.id,
        email: req.body.email,
        name: response.name,
        authorized: true,
      };
      req.session.save();
    }
    return res.json(response);
  },
  logout: async (req, res) => {
    if (req.session.user) {
      req.session.destroy(function (err) {
        if (err) throw err;
        return res.redirect('/login');
      });
    } else {
      return res.redirect('/login');
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
  personalInformation: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const user = new User(req.body);
        const myPageInfo = await user.getMyPageDetail(userId);
        const name = req.body.name ? req.body.name : myPageInfo.name;
        const phoneNum = req.body.phoneNum ? req.body.phoneNum : myPageInfo.phoneNum;
        const address = req.body.address ? req.body.address : myPageInfo.address;
        const params = [name, phoneNum, address, userId];
        const response = await UserStorage.updateMyPageDetail(params);
        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.json({ success: false, message: '개인정보 변경에 실패하였습니다.' });
      }
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

module.exports = {
  output,
  process,
};
