'Host strict';

const db = require('../../../config/database');

class HostStorage {
  static getHostInfo(storeId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Store WHERE storeId = ?;';
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static postStoreInfo(params) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Store(storeId,Store.password,storeName,imageUrl,info,phoneNum,categoryId,provinceId,cityId,roadAddress,detailAddress,Store.type,licenseNum,openTime,Store.limit)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = HostStorage;
