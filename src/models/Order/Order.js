'order strict';
const OrderStorage = require('./OrderStorage');

class Order {
  constructor(body) {
    this.body = body;
  }
  async cart(id, productId, option, totalPrice) {
    try {
      await OrderStorage.postCart(id, productId, option, totalPrice);
      return { success: true, message: '상품이 장바구니에 추가되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '상품을 장바구니에 추가하는데 실패하였습니다. ' };
    }
  }
  async getCart(id) {
    try {
      const getCart = await OrderStorage.getCart(id);
      return getCart;
    } catch (err) {
      console.log(err);
      return { success: false, message: '장바구니 조회에 실패하였습니다.' };
    }
  }
}
module.exports = Order;
