'order strict';
const OrderStorage = require('./OrderStorage');

class Order {
  constructor(body) {
    this.body = body;
  }
  async createOrder(userId, productId, designUrl) {
    try {
      const order = this.body;
      if (!order.selectedDate) return { success: false, message: '픽업날짜를 선택해 주세요.' };
      const params = [userId, productId, order.option, order.totalPrice, order.requirements, designUrl, order.selectedDate];
      const postOrder = await OrderStorage.createOrder(params);
      return { success: true, orderId: postOrder.insertId };
    } catch (err) {
      console.log(err);
      return { success: false, message: '주문에 실패하였습니다.' };
    }
  }
}
module.exports = Order;
