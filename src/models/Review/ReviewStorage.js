'use strict';

const db = require('../../config/database');

class ReviewStorage {
  static postReview(id, storeId, ordersId, imageUrl, contents, score) {
    return new Promise((resolve, reject) => {
      const query = 'insert into Review(userId, storeId, ordersId, imageUrl, contents, score) values(?,?,?,?,?,?);';
      db.query(query, [id, storeId, ordersId, imageUrl, contents, score], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = ReviewStorage;
