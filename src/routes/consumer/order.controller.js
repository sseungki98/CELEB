'use strict';

const Order = require('../../models/Order/Order');

const output = {
  cart: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const order = new Order(req.body);
      const response = await order.getCart(id);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다. ' });
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
    if (req.session.user) {
      const id = req.session.user.id;
      var { cartId, productId, option, location, totalPrice } = req.body;
      const order = new Order(req.body);
      if (cartId) {
        const getCart = await order.getCartInfo(cartId);
        productId = getCart[0].productId;
        option = getCart[0].options;
        totalPrice = getCart[0].totalPrice;
      } else {
        if (!productId) return res.json({ success: false, message: '상품 id를 입력해주세요. ' });
        if (!totalPrice) return res.json({ success: false, message: '금액을 입력해주세요.' });
      }
      const response = await order.order(id, productId, option, location, totalPrice);
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
