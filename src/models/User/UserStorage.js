'user strict';

const db = require('../config/database');

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
  static postUserInfo(params) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO User(email,password,nickname,phoneNum,address) VALUES (?,?,?,?,?);';
      db.query(query, [params], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
}

module.exports = UserStorage;
