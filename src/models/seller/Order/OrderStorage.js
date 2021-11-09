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
  static getOrderByStoreId(storeId, start, pageSize) {
    // 승환: orderId, userId, userName, productId, productName, totalCost, orderStatusId, orderStatusName, createdAt, selectedDate, option, 도안, requirements, designUrl  done
    return new Promise((resolve, reject) => {
      const query =
        'select a.id as orderId, d.id as storeId, a.userId as userId, b.name as userrName, a.productId as productId, c.name as productName, a.options as options, concat(format(a.totalPrice, 0), "원") as totalPrice, a.orderStatusId as orderStatusId, e.name as orderStatusName, a.requirements as requirements, a.designUrl as designImageUrl, a.selectedDate as selectedDate, date_format(a.createdAt, "%Y-%m-%d %H:%i") as createdAt from Orders a left join ( select id, name, phoneNum from User ) as b on a.userId = b.id left join ( select id, storeId, name from Product ) as c on a.productId = c.id left join ( select id from Store ) as d on c.storeId = d.id left join ( select id, name from OrderStatus ) as e on a.orderStatusId = e.id where d.id = ? order by a.createdAt desc limit ?, ?;';
      db.query(query, [storeId, start, pageSize], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getRecentOrderProductByStoreId(id) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT od.id as orderId,pd.name as productName,od.selectedDate,od.orderStatusId
      FROM Orders od join Product pd on pd.id = od.productId
      WHERE pd.storeId = ?
      ORDER BY od.createdAt DESC
      limit 5;
      `;
      db.query(query, id, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getRecentOrderCountByStoreId(id) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT date_format(od.createdAt,'%Y-%m-%d') as 'date', count('date') as 'orderCnt'
      FROM Orders od JOIN Product pd ON od.productId=pd.id
      WHERE od.createdAt BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND NOW() AND pd.storeId=?
      GROUP BY date_format(od.createdAt,'%Y-%m-%d');
      `;
      db.query(query, id, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = OrderStorage;
