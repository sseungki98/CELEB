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
}
module.exports = ProductStorage;
