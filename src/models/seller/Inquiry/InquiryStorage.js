'inquiry strict';

const db = require('../../../config/database');

class InquiryStorage {
  static getInquiryListByStoreId(storeId) {
    // 승환: 유저 네임 done
    //TODO: 이미지 보류, userId, userName, inquiryId, inquriyContent, createdAt
    return new Promise((resolve, reject) => {
      const query = `
        select *
        from (
		        select i.storeId, s.storeName, s.imageUrl, i.userId, i.id, i.contents, i.createdAt
		        from Inquiry i left join Store s on s.id=i.storeId
            where (i.userId,i.createdAt) in (
				          select userId, max(createdAt) as createdAt
				          from Inquiry group by storeId,userId) and i.storeId=?
		        order by i.createdAt DESC) t
        Group by t.userId;
      `;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getInquiryDetailByUserId(userId, storeId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as id
      , b.id as userId
      , b.name as userName
      , a.type as type
      , a.contents as contents
      , date_format(a.createdAt, '%Y-%m-%d %H:%i') as createdAt
 from Inquiry a
 right join ( select id, name
             from User ) as b
             on a.userId = b.id
 where a.userId = ? and a.storeId = ? and a.status = 'ACTIVE'
 order by a.createdAt`;
      db.query(query, [userId, storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static postInquiry(storeId, userId, contents) {
    // TODO: success 반환 통일
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(storeId, userId, contents, type) VALUES(?,?,?,"OUTGOING");';
      db.query(query, [storeId, userId, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
}
module.exports = InquiryStorage;
