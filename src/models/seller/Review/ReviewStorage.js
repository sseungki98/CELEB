'review strict';

const db = require('../../../config/database');

class ReviewStorage {
  static getReview(id, start, pageSize) {
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
order by a.createdAt desc limit ?, ?;`;
      db.query(query, [id, start, pageSize], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getReviewReply(reviewId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as replyId
      , a.storeId as storeId
      , b.storeName as storeName
      , b.imageUrl as storeImage
      , a.contents as replyContents
      , date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt
from ReviewReply a
left join ( select id, storeName, imageUrl
          from Store ) as b
          on a.storeId = b.id
where a.reviewId = ? and a.status = 'ACTIVE'
order by a.createdAt asc;`;
      db.query(query, [reviewId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = ReviewStorage;
