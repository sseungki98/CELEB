'order strict';

const db = require('../../config/database');

class OrderStorage {
  static postCart(id, productId, option, totalPrice) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Cart(userId, productId, `option`, totalPrice) VALUES(?,?,?,?);';
      db.query(query, [id, productId, option, totalPrice], (err, data) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
  static getCart(id) {
    return new Promise((resolve, reject) => {
      const query =
        'select a.id as CartId, c.id as StoreId, c.storeName as StoreName, c.imageUrl as StoreImage, b.id as ProductId, b.name as ProductName, b.imageUrl as ProductImage, a.`option` as Options, a.totalPrice as TotalPrice, date_format(a.createdAt, "%Y-%m-%d %H:%i") as CreatedAt from Cart a left join ( select id, name, storeId, imageUrl from Product ) as b on a.productId = b.id left join ( select id, storeName, imageUrl from Store ) as c on b.storeId = c.id where a.userId = ? and a.status = "ACTIVE" order by a.createdAt desc;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}
module.exports = OrderStorage;
