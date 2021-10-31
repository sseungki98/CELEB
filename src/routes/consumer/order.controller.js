'use strict';

const Order = require('../../models/consumer/Order/Order');
const OrderStorage = require('../../models/consumer/Order/OrderStorage');

const output = {
  cart: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const cartList = await OrderStorage.getCartListByUser(userId);
        res.render('consumer/cart', { cartList });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
  order: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const orderId = req.params.orderId;
        const orderDetail = await OrderStorage.getOrderDetail(userId, orderId);
        res.render('consumer/orderDetail', { orderDetail });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
};
const process = {
  cart: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const { productId, option, totalPrice } = req.body;
      if (!productId) return res.json({ success: false, message: '상품 id를 입력해주세요. ' });
      if (!option) return res.json({ success: false, message: '상품 옵션을 입력해주세요. ' });
      if (!totalPrice) return res.json({ success: false, message: '전체 금액을 입력해주세요. ' });
      const order = new Order(req.body);
      const response = await order.cart(id, productId, option, totalPrice);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다. ' });
    }
  },
  order: async (req, res) => {
    //TODO: fix here (no cart)
    if (req.session.user) {
      const userId = req.session.user.id;
      const productId = req.params.productId;
      let { option, totalPrice, requirements, designUrl, selectedDate } = req.body;
      if (!selectedDate) return res.json({ success: false, message: '픽업날짜를 선택해 주세요.' });
      const order = new Order(req.body);
      const response = await order.order(userId, productId, option, totalPrice, requirements, designUrl, selectedDate);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다. ' });
    }
  },
};

module.exports = {
  output,
  process,
};
