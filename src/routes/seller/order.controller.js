'use strict';

const Order = require('../../models/seller/Order/Order');
const OrderStorage = require('../../models/seller/Order/OrderStorage');

const output = {
  order: async (req, res) => {
    if (req.session.host) {
      const id = req.session.host.id;
      const { page } = req.query;
      const pageSize = 10;
      const order = new Order(req.body);
      const response = await order.getOrder(id, page, pageSize);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
  orderDetail: async (req, res) => {
    if (req.session.host) {
      const orderId = req.params.orderId;
      const order = new Order(req.body);
      const response = await order.getOrderDetail(orderId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};
const process = {
  orderStatus: async (req, res) => {
    if (req.session.host) {
      const { orderId, status } = req.body;
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
