'use strict';

const db = require('../../config/database');

class StoreStorage {
  static getStoreByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
      // TODO: 지역별, 인기순 필터링
      const query = `SELECT s.id as storeId, s.storeName, s.imageURL, s.info, p.name as province, c.name as city, type  
          FROM Store s JOIN Province p ON s.provinceId=p.id JOIN City c ON s.cityId=c.id WHERE s.categoryId = ?;`;
      db.query(query, [categoryId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = StoreStorage;
