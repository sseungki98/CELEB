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
}
module.exports = InquiryStorage;
