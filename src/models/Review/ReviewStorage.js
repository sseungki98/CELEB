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
  static getReview(storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as ReviewId
          , b.id as UserId
          , b.name as UserName
          , d.id as ProductId
          , d.name as ProductName
          , a.imageUrl as ReviewImage
          , a.score as ReviewScore
          , a.contents as ReviewContents
          , date_format(a.createdAt, "%Y-%m-%d %H:%i") as CreatedAt
  from Review a
  left join ( select id, name
              from User) as b
              on a.userId = b.id
  left join ( select id, productId
              from Orders) as c
              on a.ordersId = c.id
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
}

module.exports = ReviewStorage;
