'use strict';
const StoreStorage = require('./StoreStorage');

class Store {
  constructor(body) {
    this.body = body;
  }
  async getStorePage(storeId) {
    const storePage = await StoreStorage.getMyStorePageByStoreId(storeId);
    return storePage;
  }
}

module.exports = Store;
