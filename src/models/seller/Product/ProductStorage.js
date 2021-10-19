'use strict';

const db = require('../../../config/database');
class ProductStorage {
  static getProductListByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as productId, name, imageUrl as image,info,price,detailImageUrl,date_format(createdAt,'%Y-%m-%d') as createdAt
          FROM Product
          WHERE storeId=? and status='ACTIVE' ORDER BY name;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductDetailByProductId(storeId, productId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT pd.id as productId,pd.name,pd.imageUrl as image,pd.info,pd.price,pd.detailImageUrl,date_format(pd.createdAt,'%Y-%m-%d') as createdAt,pdoc.name as categoryName,pdo.name as optionName,pdo.price as plusPrice,pdo.type
        FROM Product pd left join ProductOption pdo on pd.id=pdo.productId left join ProductOptionCategory pdoc on pdo.optionCategoryId=pdoc.id
        WHERE pd.storeId=? and pd.id=?;`;
      db.query(query, [storeId, productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static createProductByStoreId(params) {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO Product(storeId,name,ImageUrl,info,price,detailImageUrl) VALUES (?,?,?,?,?,?);`;
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static createProductOption(params) {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO ProductOption(productId,optionCategoryId,name,price,type) VALUES (?,?,?,?,?);`;
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static createCategory(categoryName) {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO ProductOptionCategory(name) VALUES (?);`;
      db.query(query, categoryName, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getCategoryName(categoryName) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT id,exists (SELECT id as pid FROM ProductOptionCategory WHERE name='?') as exist FROM ProductOptionCategory WHERE name='?';`;
      db.query(query, categoryName, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static deleteProductByProductId(storeId, productId) {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE Product as p, ProductOption as po SET p.status="DELETE", po.status="DELETE" WHERE p.storeId=? and p.id=? and po.productId=?`;
      db.query(query, [storeId, productId, productId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}
module.exports = ProductStorage;
