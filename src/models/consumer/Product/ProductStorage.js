'use strict';

const db = require('../../../config/database');

class ProductStorage {
  static getProductDetailInfo(storeId, productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id,name,imageUrl,info,price,detailImageUrl FROM Product WHERE storeId=? and id=? and status='ACTIVE';`;
      db.query(query, [storeId, productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductOptionInfoByProductId(productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT po.id as 'OptionId',po.name as 'OptionName',po.price,po.type,poc.id as 'CategoryId',poc.name as 'CategoryName'
          FROM ProductOption po JOIN ProductOptionCategory poc ON po.optionCategoryId=poc.id
          WHERE po.productId=? and po.status='ACTIVE';`;
      db.query(query, [productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = ProductStorage;
