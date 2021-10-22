'use strict';

const db = require('../../../config/database');

class StoreStorage {
  static getStoreDetailByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id,st.storeName as 'name',st.ImageUrl as Image, st.openTime as 'OperatingHour', rtt.avgstar as star, st.info, st.phoneNum,concat(pv.name,' ',ct.name,' ',st.roadAddress,' ',st.detailAddress) as location,st.provinceId,st.cityId,st.roadAddress,st.detailAddress,st.limit,type
          FROM Store st left join (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=st.id
                        left join Province pv on pv.id=st.provinceId join City ct on ct.id=st.cityId
          WHERE st.status='ACTIVE' and st.id=?;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getLicenseNumberDuplication(rgno) {
    return new Promise((resolve, reject) => {
      const query = `SELECT exists (SELECT id FROM Store WHERE licenseNum=? and status='ACTIVE') as exist;`;
      db.query(query, [rgno], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static updateStorePageDetail(params) {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE Store SET storeName=?,phoneNum=?,info=?,openTime=?,provinceId=?,cityId=?,roadAddress=?,detailAddress=?,Store.limit=?,type=?,imageUrl=?,notice=? WHERE id=?;`;
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true, message: '스토어 수정이 완료되었습니다. ' });
      });
    });
  }
}
module.exports = StoreStorage;
