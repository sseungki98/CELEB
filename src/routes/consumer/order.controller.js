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
  order: async (req, res) => {
    const userId = req.session.user.id;
    const productId = req.params.productId;
    const order = new Order(req.body);
    const response = await order.createOrder(userId, productId);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
