'use strict';
const OrderStorage = require('./OrderStorage');

class Order {
  constructor(body) {
    this.body = body;
  }
  async patchStatus(orderId) {
    try {
      const order = this.body;
      if (!order) return res.json({ success: false, message: '상태를 입력해주세요. ' });
      await OrderStorage.patchStatus(order.status, orderId);
      return { success: true, message: '주문 상태를 변경하였습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '주문 상태 변경에 실패하였습니다. ' };
    }
  }
}

module.exports = Order;
