'inquiry strict';

const db = require('../../../config/database');

class InquiryStorage {
  static createInquiry(id, storeId, productId, type, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(userId, storeId, productId, type, contents) VALUES(?,?,?,?,?);';
      db.query(query, [id, storeId, productId, type, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getInquiryDetailByStoreId(id, storeId) {
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
  static getInquiryListByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `select a.storeId as StoreId
      , a.storeName as storeName
      , a.imageUrl as storeImage
      , a.userId as userId
      , a.id as inquiryId
      , a.contents as inquiryContents
      , date_format(a.createdAt, '%Y-%m-%d %H:%i') as createdAt
from ( select i.storeId, s.storeName, s.imageUrl, i.userId, i.id, i.contents, i.createdAt, ROW_NUMBER() over (PARTITION BY i.storeId ORDER BY i.createdAt DESC) as rowNum from Inquiry i left join Store s on i.storeId=s.id where i.userId = ?) a
where rowNum = 1;`;
      db.query(query, [userId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  //   static getLastInquiry(id, storeId) {
  //     return new Promise((resolve, reject) => {
  //       const query = `select id as InquiryId
  //       , contents as Contents
  // from Inquiry
  // where userId = ? and storeId = ?
  // order by createdAt desc limit 1;`;
  //       db.query(query, [id, storeId], (err, data) => {
  //         if (err) reject(`${err}`);
  //         resolve(data);
  //       });
  //     });
  //   }
}

module.exports = InquiryStorage;
