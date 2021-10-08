'inquiry strict';

const db = require('../../../config/database');

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
  static getInquiryRow(id, storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as Id
      , a.type as Type
      , case when a.type='OUTGOING' then b.id else c.id end as SenderId
      , case when a.type='OUTGOING' then b.storeName else c.name end as SenderName
      , a.contents as Contents
      , date_format(a.createdAt, '%Y-%m-%d %H:%i') as CreatedAt
 from Inquiry a
 left join ( select id,storeName
             from Store ) as b
             on a.storeId = b.id
 left join ( select id, name
             from User ) as c
             on a.userId = c.id
 where a.userId = ? and a.storeId = ?
 order by a.createdAt desc;`;
      db.query(query, [id, storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve([data]);
      });
    });
  }
  static getMyInquiry(id) {
    return new Promise((resolve, reject) => {
      const query = `select a.userId as UserId
      , a.storeId as StoreId
      , b.imageUrl as StoreImage
      , date_format(a.createdAt, "%Y-%m-%d %H:%i") as CreatedAt
from Inquiry a
left join ( select id
              , storeName
              , imageUrl
          from Store ) as b
          on a.storeId = b.id
where a.userId = ?
group by a.storeId
order by a.createdAt desc;`;
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getLastInquiry(id, storeId) {
    return new Promise((resolve, reject) => {
      const query = `select id as InquiryId
      , contents as Contents
from Inquiry
where userId = ? and storeId = ?
order by createdAt desc limit 1;`;
      db.query(query, [id, storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = InquiryStorage;
