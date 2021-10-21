'inquiry strict';

const db = require('../../../config/database');

class InquiryStorage {
  static getInquiryListByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.storeId as storeId
      , a.storeName as storeName
      , a.imageUrl as storeImage
      , a.userId as userId
      , a.id as inquiryId
      , a.contents as inquiryContents
      , date_format(a.createdAt, '%Y-%m-%d %H:%i') as createdAt
from ( select i.storeId, s.storeName, s.imageUrl, i.userId, i.id, i.contents, i.createdAt, ROW_NUMBER() over (PARTITION BY i.storeId ORDER BY i.createdAt DESC) as rowNum from Inquiry i left join Store s on i.storeId=s.id where i.storeId = ?) a
where rowNum = 1;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getInquiryByUserId(userId, storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as id
          , a.type as type
          , case when a.type='OUTGOING' then b.id else c.id end as senderId
          , case when a.type='OUTGOING' then b.storeName else c.name end as senderName
          , a.contents as contents
          , date_format(a.createdAt, '%Y-%m-%d %H:%i') as createdAt
     from Inquiry a
     left join ( select id,storeName
                 from Store ) as b
                 on a.storeId = b.id
     left join ( select id, name
                 from User ) as c
                 on a.userId = c.id
     where a.userId = ? and a.storeId = ? and a.status = 'ACTIVE'
     order by a.createdAt desc;`;
      db.query(query, [userId, storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static postInquiry(storeId, userId, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(storeId, userId, contents, type) VALUES(?,?,?,"OUTGOING");';
      db.query(query, [storeId, userId, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}
module.exports = InquiryStorage;
