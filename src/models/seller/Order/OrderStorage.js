'order strict';

const db = require('../../../config/database');

class OrderStorage {
  static patchStatus(status, orderId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET orderStatusId =? WHERE id = ?;';
      db.query(query, [status, orderId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = OrderStorage;
