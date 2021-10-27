'use strict';
const OrderStorage = require('./OrderStorage');

class Order {
  constructor(body) {
    this.body = body;
  }
  async patchStatus(status, orderId) {
    try {
      await OrderStorage.patchStatus(status, orderId);
      return { success: true, message: '주문 상태를 변경하였습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '주문 상태 변경에 실패하였습니다. ' };
    }
  }
}

module.exports = Order;
