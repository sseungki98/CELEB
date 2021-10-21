'use strict';

const db = require('../../../config/database');

class StoreStorage {
  static getPopularStore() {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id as storeId ,st.storeName as 'name',st.ImageUrl as image,st.openTime as 'operatingHour',tt.cnt as cnt,case when rtt.avgstar is null then '-' else rtt.avgstar end as 'star',concat(pv.name,' ',ct.name) as location, type
       FROM Store st left join (Select st.id as sid,count(*) as cnt From Orders od join Product pd on pd.id=od.productId join Store st on st.id=pd.storeId WHERE od.orderStatusId='CONFIRMED' or od.orderStatusId='PICKUPED' Group by st.id) tt on st.id=tt.sid
                     left join (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=st.id
                     left join Province pv on pv.id=st.provinceId join City ct on ct.id=st.cityId
       WHERE st.status='ACTIVE'
       ORDER BY cnt DESC,'star rating' DESC
       limit 9;`;
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getStoreDetailByStoreId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT st.id as storeId, st.storeName as 'name',st.ImageUrl as image, st.openTime as 'operatingHour', rtt.avgstar as star, st.info as info, st.phoneNum as phoneNum,concat(pv.name,' ',ct.name,' ',st.roadAddress,' ',st.detailAddress) as location, st.notice
          FROM Store st left join (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=st.id
                        left join Province pv on pv.id=st.provinceId join City ct on ct.id=st.cityId
          WHERE st.status='ACTIVE' and st.id=?;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static getStoreByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT s.id as storeId, s.storeName, s.imageURL as image, s.info, s.openTime as operatingHour, case when rtt.avgstar is null then '-' else rtt.avgstar end as 'star', concat(p.name,' ',c.name) as location, type  
      FROM Store s left JOIN Province p ON s.provinceId=p.id JOIN City c ON s.cityId=c.id
                   left JOIN (Select s.id as sid,count(*) as cnt From Orders od join Product pd on pd.id=od.productId join Store s on s.id=pd.storeId WHERE od.orderStatusId='CONFIRMED' or od.orderStatusId='PICKUPED' Group by s.id) tt ON s.id=tt.sid
                   left JOIN (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=s.id 
      WHERE s.categoryId = ? and s.status='ACTIVE'
      ORDER BY tt.cnt DESC;`;
      db.query(query, [categoryId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getStoreByCategoryIdWithProvinceId(categoryId, provinceId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT s.id as storeId, s.storeName, s.imageURL, s.info, case when rtt.avgstar is null then '-' else rtt.avgstar end as 'star', concat(p.name,' ',c.name) as location, type  
      FROM Store s left JOIN Province p ON s.provinceId=p.id JOIN City c ON s.cityId=c.id
                   left JOIN (Select s.id as sid,count(*) as cnt From Orders od join Product pd on pd.id=od.productId join Store s on s.id=pd.storeId WHERE od.orderStatusId='CONFIRMED' or od.orderStatusId='PICKUPED' Group by s.id) tt ON s.id=tt.sid
                   left JOIN (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=s.id 
      WHERE s.categoryId = ? and s.provinceId = ? and s.status='ACTIVE'
      ORDER BY tt.cnt DESC;`;
      db.query(query, [categoryId, provinceId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getStoreByCategoryIdWithCityId(categoryId, provinceId, cityId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT s.id as storeId, s.storeName, s.imageURL, s.info, case when rtt.avgstar is null then '-' else rtt.avgstar end as 'star', concat(p.name,' ',c.name) as location, type  
      FROM Store s left JOIN Province p ON s.provinceId=p.id JOIN City c ON s.cityId=c.id 
                   left JOIN (Select rv.storeId as sid, round(AVG(rv.score),1) as avgstar From Review rv Where rv.status='ACTIVE' Group by rv.storeId) rtt on rtt.sid=s.id 
      WHERE s.categoryId = ? and s.provinceId = ? and s.cityId = ? and s.status='ACTIVE'
      ORDER BY s.createdAt DESC;`;
      db.query(query, [categoryId, provinceId, cityId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getProductReservationDateByProductId(storeId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT oc.id,oc.orderDate FROM OrderCalendar oc JOIN Store s ON s.id=oc.storeId WHERE s.limit=oc.orderCount and s.id=?;`;
      db.query(query, [storeId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static searchStore(params) {
    return new Promise((resolve, reject) => {
      const query = `select a.id as storeId
      , a.storeName as storeName
      , a.imageUrl as storeImage
      , a.info as storeInfo
      , starGrade as starGrade
      , reviewCount as reviewCount
      , concat(d.name,' ',e.name) as location
      , a.type as storeType0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
from Store a
left join ( select id, name
          from Category ) as b
          on a.categoryId = b.id
left join  ( select id, storeId, name
          from Product ) as c
          on a.id = c.storeId
left join ( select id, name
          from Province ) as d
          on a.provinceId = d.id
left join ( select id, name
          from City ) as e
          on a.cityId = e.id
left join ( select id, storeId, score, round(sum(score)/count(storeId), 1) as 'starGrade', count(storeId) as 'reviewCount'
          from Review
          group by storeId) as f
          on a.id = f.storeId
left join ( select id, productId, count(productId) as 'orderCount'
          from Orders
          group by productId) as g
          on c.id = g.productId
where b.name like ? or c.name like ? or d.name like ? or e.name like ? and a.status = 'ACTIVE'
order by orderCount desc;`;
      db.query(query, params, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static updateStorePage(params) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Store
      SET storeName=?, imageUrl=?, info=?, phoneNum=?, categoryId=?, provinceId=?, cityId=?, roadAddress=?, detailAddress=?, type=?, openTime=?, closeTime=?, limit=?
      WHERE id=?;`;
      db.query(query, [params], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }

  static getCategoryDetailByCateoryId(categoryId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as categoryId, name as categoryName, imageUrl as categoryImage FROM Category WHERE id=?`;
      db.query(query, [categoryId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static getProvinceList() {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as provinceId, name as provinceName FROM Province`;
      db.query(query, [], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
  static getCityByProvinceId(provinceId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id as cityId, provinceId, name as cityName FROM City WHERE provinceId=?`;
      db.query(query, [provinceId], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}
module.exports = StoreStorage;
