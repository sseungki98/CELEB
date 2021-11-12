'review strict';

const db = require('../../../config/database');

class ReviewStorage {
  static getStoreReviewCountByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `select s.storeName as storeName
      , format(sum(r.score)/count(r.storeId), 1) as averageScore
      , count(r.id) as reviewCount
      , count(case when r.score=5 then 1 end) as count5
      , count(case when r.score=4 then 1 end) as count4
      , count(case when r.score=3 then 1 end) as count3
      , count(case when r.score=2 then 1 end) as count2
      , count(case when r.score=1 then 1 end) as count1
from Review r join Store s on r.storeId=s.id
where r.storeId = ? and r.status = 'ACTIVE';`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getReviewByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as reviewId
          , b.id as userId
          , b.name as userName
          , d.id as productId
          , d.name as productName
          , a.imageUrl as reviewImage
          , a.score as reviewScore
          , a.contents as reviewContents
          , date_format(a.createdAt, "%Y-%m-%d") as reviewAt
          , e.id as replyId
      , e.storeId as storeId
      , f.storeName as storeName
      , e.contents as replyContents
      , date_format(e.createdAt, "%Y-%m-%d") as replyAt
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
  left join ( select id, storeId, reviewId, contents, createdAt
              from ReviewReply ) as e
              on a.id = e.reviewId
  left join ( select id, storeName, imageUrl
              from Store ) as f
              on e.storeId = f.id
  where a.storeId = ? and a.status = 'ACTIVE'
  order by a.createdAt desc;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static createReviewReply(storeId, reviewId, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO ReviewReply(storeId, reviewId, contents) VALUES(?,?,?);';
      db.query(query, [storeId, reviewId, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = ReviewStorage;
