'use strict';

const Order = require('../../models/seller/Order/Order');
const OrderStorage = require('../../models/seller/Order/OrderStorage');

const output = {
  order: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const page = req.query.page ? req.query.page : 1;
        const pageSize = 10;
        let start = 0;
        if (page <= 0) {
          page = 1;
        } else {
          start = (page - 1) * pageSize;
        }
        const orderList = await OrderStorage.getOrderByStoreId(storeId, start, pageSize);
        return res.render('seller/orderList', { orderList, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      return res.render('seller/login', { layout: 'seller/layout' });
    }
  },
};
const process = {
  orderStatus: async (req, res) => {
    if (req.session.user) {
      const orderId = req.params.orderId;
      const { status } = req.body;
      if (!orderId) return res.json({ success: false, message: '주문 id를 입력해주세요. ' });
      if (!status) return res.json({ success: false, message: '상태를 입력해주세요. ' });
      const order = new Order(req.body);
      const response = await order.patchStatus(status, orderId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};

module.exports = {
  output,
  process,
};
