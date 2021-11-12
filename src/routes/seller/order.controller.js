'use strict';

const Order = require('../../models/seller/Order/Order');
const OrderStorage = require('../../models/seller/Order/OrderStorage');

const output = {
  order: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
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
      return res.render('seller/login');
    }
  },
  salesAccount: async (req, res) => {
    return res.render('seller/salesAccount', { layout: 'seller/layout' });
  },
};
const process = {
  orderStatus: async (req, res) => {
    const orderId = req.params.orderId;
    console.log(req.body);
    const order = new Order(req.body);
    const response = await order.patchStatus(orderId);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
