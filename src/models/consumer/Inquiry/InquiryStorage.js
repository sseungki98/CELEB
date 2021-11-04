'inquiry strict';

const db = require('../../../config/database');

class InquiryStorage {
  static createInquiry(id, storeId, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(userId, storeId, type, contents) VALUES(?,?,"INCOMING",?);';
      db.query(query, [id, storeId, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getInquiryDetailByStoreId(id, storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as id
      , b.id as storeId
      , b.storeName as storeName
      , a.type as type
      , a.contents as contents
      , date_format(a.createdAt, '%Y-%m-%d %H:%i') as createdAt
 from Inquiry a
 left join ( select id,storeName
             from Store ) as b
             on a.storeId = b.id
 where a.userId = ? and a.storeId = ? and a.status = 'ACTIVE'
 order by a.createdAt`;
      db.query(query, [id, storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getInquiryListByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `select a.storeId as storeId
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
