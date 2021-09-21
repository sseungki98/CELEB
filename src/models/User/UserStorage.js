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
  static register(params) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO User(email,password,name,phoneNum,address) VALUES (?,?,?,?,?);';
      db.query(query, [params], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static checkUserInfo(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM User WHERE email=?;';
      db.query(query, [email], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
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
}

module.exports = UserStorage;
