'Store strict';

const db = require('../../config/database');

class StoreStorage {
  static getStoreInfoByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id,st.storeName as 'name',st.ImageUrl as Image,concat(st.openTime,'-',st.closeTime) as 'Operating Hour', rtt.avgstar as 'star rating', st.info as info, st.phoneNum as phoneNum,concat(pv.name,' ',ct.name,' ',st.roadAddress,' ',st.detailAddress) as location
          FROM Store st join (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=st.id
                        join Province pv on pv.id=st.provinceId join City ct on ct.id=st.cityId
          WHERE st.status='ACTIVE' and st.id=?;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getProductInfoByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT name,imageUrl,info,price,detailImageUrl FROM Product WHERE storeId=? and status='ACTIVE';`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve([data]);
      });
    });
  }
}

module.exports = StoreStorage;
