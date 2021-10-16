'use strict';

const db = require('../../../config/database');

class ReviewStorage {
  static postReview(userId, storeId, orderId, imageUrl, contents, score) {
    return new Promise((resolve, reject) => {
      const query = `insert into Review(userId, storeId, orderId, imageUrl, contents, score) values(?,?,?,?,?,?);`;
      db.query(query, [userId, storeId, orderId, imageUrl, contents, score], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
  static patchReview(userId, reviewId) {
    return new Promise((resolve, reject) => {
      const query = `update Review set status="DELETED" where userId = ? and id = ?;`;
      db.query(query, [userId, reviewId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
  static getReview(storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as reviewId
          , b.id as userId
          , b.name as userName
          , d.id as productId
          , d.name as productName
          , a.imageUrl as reviewImage
          , a.score as reviewScore
          , a.contents as reviewContents
          , date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt
  from Review a
  left join ( select id, name
              from User) as b
              on a.userId = b.id
  left join ( select id, productId
              from Orders) as c
              on a.orderId = c.id
  left join ( select id, name
              from Product) as d
              on c.productId = d.id
  where a.storeId = ? and a.status = 'ACTIVE'
  order by a.createdAt desc;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static checkReviewPosibility(orderId, userId) {
    return new Promise((resolve, reject) => {
      const query = `select o.id from Orders o where o.id=? and o.userId=? and o.id not in 
      ( select r.orderId from Review r where r.orderId=? r.userId=? ) `;
      db.query(query, [orderId, userId, orderId, userId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = ReviewStorage;
