'use strict';

const Order = require('../../models/Order/Order');

const output = {};
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
};

module.exports = {
  output,
  process,
};
