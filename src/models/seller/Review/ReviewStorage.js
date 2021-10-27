'review strict';

const db = require('../../../config/database');

class ReviewStorage {
  static getReviewByStoreId(storeId, start, pageSize) {
    // 승환: reply랑 칼럼으로 합치기
    return new Promise((resolve, reject) => {
      const query = `select a.id as reviewId
      , b.id as userId
      , b.name as userName
      , d.id as productId
      , d.name as productName
      , a.imageUrl as reviewImage
      , a.score as reviewScore
      , a.contents as reviewContents
      , date_format(a.createdAt, "%Y-%m-%d %H:%i") as 'createdAt(review)'
      , e.id as replyId
      , e.storeId as storeId
      , f.storeName as storeName
      , f.imageUrl as storeImage
      , e.contents as replyContents
      , date_format(e.createdAt, "%Y-%m-%d %H:%i") as 'createdAt(reply)'
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
order by a.createdAt desc limit ?, ?;`;
      db.query(query, [storeId, start, pageSize], (err, data) => {
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
