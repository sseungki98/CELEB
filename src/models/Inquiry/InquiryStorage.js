'inquiry strict';

const db = require('../../config/database');

class InquiryStorage {
  static postInquiry(id, storeId, productId, type, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(userId, storeId, productId, type, contents) VALUES(?,?,?,?,?);';
      db.query(query, [id, storeId, productId, type, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
}

module.exports = InquiryStorage;
