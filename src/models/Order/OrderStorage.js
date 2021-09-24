'order strict';

const db = require('../../config/database');

class OrderStorage {
  static postCart(id, productId, option, totalPrice) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Cart(userId, productId, `option`, totalPrice) VALUES(?,?,?,?);';
      db.query(query, [id, productId, option, totalPrice], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}
module.exports = OrderStorage;
