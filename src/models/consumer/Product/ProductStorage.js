'use strict';

const db = require('../../../config/database');

class ProductStorage {
  static getProductDetail(storeId, productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as productId, name as productName, imageUrl, info, format(price,0) as price, detailImageUrl FROM Product WHERE storeId=? and id=? and status='ACTIVE';`;
      db.query(query, [storeId, productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getProductByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as productId, name, imageUrl as image,info,format(price,0) as price,detailImageUrl FROM Product WHERE storeId=? and status='ACTIVE';`;
      db.query(query, storeId, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductOptionByProductId(productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT po.id as 'optionId',po.name as 'optionName',format(po.price,0) as price,po.type,poc.id as 'categoryId',poc.name as 'categoryName'
          FROM ProductOption po JOIN ProductOptionCategory poc ON po.optionCategoryId=poc.id
          WHERE po.productId=? and po.status='ACTIVE';`;
      db.query(query, productId, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getDisabledDatesByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT date_format(tt.sd,"%Y-%m-%d") as disabledDate
        FROM Store st
          JOIN (SELECT selectedDate as sd,count(selectedDate) as cnt,st.id as sid
	              FROM Orders od JOIN Product pd on pd.id=od.productId JOIN Store st on st.id=pd.storeId
                WHERE st.id=?
	              GROUP BY selectedDate) tt on tt.sid=st.id
        WHERE tt.cnt>=st.limit
        ORDER BY disabledDate ASC`;
      db.query(query, storeId, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = ProductStorage;
