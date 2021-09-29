'use strict';
const StoreStorage = require('./StoreStorage');

class Store {
  constructor(body) {
    this.body = body;
  }
  async searchStore(params) {
    try {
      const searchStoreRows = await StoreStorage.searchStore(params);
      return searchStoreRows;
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 검색에 실패하였습니다. ' };
    }
  }
}

module.exports = Store;
