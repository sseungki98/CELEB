'order strict';

const db = require('../../../config/database');

class OrderStorage {
  static patchStatus(status, orderId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET orderStatusId =? WHERE id = ?;';
      db.query(query, [status, orderId], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
  static getOrder(id, start, pageSize) {
    return new Promise((resolve, reject) => {
      const query =
        'select a.id as orderId, d.id as storeId, a.userId as consumerId, b.name as consumerName, a.productId as productId, c.name as productName, a.`option` as orderOption, a.location as location, concat(format(a.totalPrice, 0), "원") as totalPrice, a.orderStatusId as status, date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt from Orders a left join ( select id, name, phoneNum from User ) as b on a.userId = b.id left join ( select id, storeId, name from Product ) as c on a.productId = c.id left join ( select id from Store ) as d on c.storeId = d.id where d.id = ? order by a.createdAt desc limit ?, ?;';
      db.query(query, [id, start, pageSize], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getOrderDetail(orderId) {
    return new Promise((resolve, reject) => {
      const query =
        'select a.id as orderId, a.userId as consumerId, b.name as consumerName, a.productId as productId, c.name as productName, c.imageUrl as productImage, a.`option` as orderOption, a.location as location, concat(format(a.totalPrice, 0), "원") as totalPrice, a.orderStatusId as status, date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt from Orders a left join ( select id, name, phoneNum from User ) as b on a.userId = b.id left join ( select id, storeId, name, imageUrl from Product ) as c on a.productId = c.id left join ( select id from Store ) as d on c.storeId = d.id where a.id = ? order by a.createdAt desc;';
      db.query(query, [orderId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = OrderStorage;
