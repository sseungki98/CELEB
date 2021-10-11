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
  async getOrder(id, page, pageSize) {
    try {
      let start = 0;
      if (page <= 0) {
        page = 1;
      } else {
        start = (page - 1) * pageSize;
      }
      const getOrder = await OrderStorage.getOrder(id, start, pageSize);
      return getOrder;
    } catch (err) {
      console.log(err);
      return { success: false, message: '주문 조회에 실패하였습니다. ' };
    }
  }
  async getOrderDetail(orderId) {
    try {
      const getOrderDetail = await OrderStorage.getOrderDetail(orderId);
      return getOrderDetail;
    } catch (err) {
      console.log(err);
      return { success: false, message: '주문 상제 조회에 실패하였습니다. ' };
    }
  }
}

module.exports = Order;
