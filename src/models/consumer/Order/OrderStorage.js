'order strict';

const db = require('../../../config/database');

class OrderStorage {
  static createOrder(params) {
    return new Promise((resolve, reject) => {
      const query =
        'insert into Orders(userId, productId, options, totalPrice, requirements, designUrl, selectedDate) values(?,?,?,?,?,?,?);';
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        console.log(data);
        resolve(data);
      });
    });
  }
  static getOrderDetailByOrderId(id, orderId) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as orderId, b.storeId as storeId, c.storeName as storeName, a.productId as productId, b.name as productName, a.options as options, concat(format(a.totalPrice, 0), '원') as totalPrice, date_format(a.selectedDate, '%Y-%m-%d') as selectedDate, a.designUrl as designUrl, a.requirements as requirements
        from Orders a left join ( select id, storeId, name, imageUrl from Product ) as b on a.productId = b.id left join( select id, storeName, imageUrl from Store) as c on b.storeId = c.id 
        where a.userId = ? and a.id= ? and a.status = 'ACTIVE'`;
      db.query(query, [id, orderId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }
  static getMyOrder(id) {
    return new Promise((resolve, reject) => {
      const query =
        'select a.id as orderId, a.userId as userId, b.storeId as storeId, c.storeName as storeName, a.productId as productId, b.name as productName, b.imageUrl as productImage, a.options as options, concat(format(a.totalPrice, 0), "원") as totalPrice, a.orderStatusId as orderStatusId, d.name as orderStatus, date_format(a.selectedDate, "%Y-%m-%d") as selectedDate, date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt, a.designUrl as designUrl, a.requirements as requirements from Orders a left join ( select id, storeId, name, imageUrl from Product ) as b on a.productId = b.id left join( select id, storeName, imageUrl from Store) as c on b.storeId = c.id join OrderStatus d on a.orderStatusId=d.id where a.userId = ? and a.status = "ACTIVE" order by a.createdAt desc;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}
module.exports = OrderStorage;
