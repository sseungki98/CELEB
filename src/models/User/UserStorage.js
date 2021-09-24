'user strict';

const db = require('../../config/database');

class UserStorage {
  static getUserInfo(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User WHERE email = ?;';
      db.query(query, [email], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static register(params) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO User(email,password,name,phoneNum,address) VALUES (?,?,?,?,?);';
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
  static getMyPageInfo(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT email,name,phoneNum,address FROM User WHERE email=?;';
      db.query(query, [email], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static checkUserById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT email FROM User WHERE id=?;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getPopularStoreInfo() {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id,st.storeName as 'name',st.ImageUrl as Image,concat(st.openTime,'-',st.closeTime) as 'Operating Hour',tt.cnt as cnt, rtt.avgstar as 'star rating',concat(pv.name,' ',ct.name) as location
       FROM Store st join (Select st.id as sid,count(*) as cnt From Orders od join Product pd on pd.id=od.productId join Store st on st.id=pd.storeId WHERE od.status='COMPLETE' Group by st.id) tt on st.id=tt.sid
                     join (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=st.id
                     join Province pv on pv.id=st.provinceId join City ct on ct.id=st.cityId
       WHERE st.status='ACTIVE'
       ORDER BY cnt DESC,'star rating' DESC;`;
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static postInquiry(id, storeId, productId, type, contents) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Inquiry(userId, storeId, productId, type, contents) VALUES(?,?,?,?,?);';
      db.query(query, [id, storeId, productId, type, contents], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
