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
  static patchReview(id, reviewId) {
    return new Promise((resolve, reject) => {
      const query = 'update Review set status="DELETED" where userId = ? and id = ?;';
      db.query(query, [id, reviewId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = ReviewStorage;
