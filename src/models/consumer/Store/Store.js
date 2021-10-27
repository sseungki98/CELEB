'use strict';
const StoreStorage = require('./StoreStorage');

class Store {
  constructor(body) {
    this.body = body;
  }
  async getStoreByCategoryId(categoryId, page, pagesize) {
    try {
      let start = 0;
      if (page <= 0) {
        page = 1;
      } else {
        start = (page - 1) * pageSize;
      }
      const getStore = await StoreStorage.getStoreByCategoryId(categoryId, page, pagesize);
      return getStore;
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 가져오기에 실패하였습니다. ' };
    }
  }
  async getStoreByCategoryIdWithProvinceId(categoryId, provinceId, page, pagesize) {
    try {
      let start = 0;
      if (page <= 0) {
        page = 1;
      } else {
        start = (page - 1) * pageSize;
      }
      const getStore = await StoreStorage.getStoreByCategoryIdWithProvinceId(categoryId, provinceId, page, pagesize);
      return getStore;
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 가져오기에 실패하였습니다. ' };
    }
  }
  async getStoreByCategoryIdWithCityId(categoryId, provinceId, cityId, page, pagesize) {
    try {
      let start = 0;
      if (page <= 0) {
        page = 1;
      } else {
        start = (page - 1) * pageSize;
      }
      const getStore = await StoreStorage.getStoreByCategoryIdWithCityId(categoryId, provinceId, cityId, page, pagesize);
      return getStore;
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 가져오기에 실패하였습니다. ' };
    }
  }
}

module.exports = Store;
