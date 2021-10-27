'use strict';

const db = require('../../../config/database');

class ProductStorage {
  static getProductDetail(storeId, productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as productId, name as productName, imageUrl, info, price, detailImageUrl FROM Product WHERE storeId=? and id=? and status='ACTIVE';`;
      db.query(query, [storeId, productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getProductByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as productId, name, imageUrl as image,info,price,detailImageUrl FROM Product WHERE storeId=? and status='ACTIVE';`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductOptionByProductId(productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT po.id as 'optionId',po.name as 'optionName',po.price,po.type,poc.id as 'categoryId',poc.name as 'categoryName'
          FROM ProductOption po JOIN ProductOptionCategory poc ON po.optionCategoryId=poc.id
          WHERE po.productId=? and po.status='ACTIVE';`;
      db.query(query, [productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductReservationDateByProductId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT oc.id,oc.orderDate FROM OrderCalendar oc JOIN Store s ON s.id=oc.storeId WHERE s.limit=oc.orderCount and s.id=?;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = ProductStorage;
