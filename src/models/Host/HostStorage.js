'Host strict';

const db = require('../../config/database');

class HostStorage {
  static getHostInfo(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Host WHERE email = ?;';
      db.query(query, [email], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
}

module.exports = HostStorage;
