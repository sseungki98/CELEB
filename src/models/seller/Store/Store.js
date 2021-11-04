'use strict';
const StoreStorage = require('./StoreStorage');

class Store {
  constructor(body) {
    this.body = body;
  }
  async updateStoreDetail(storeId) {
    const params = [
      this.body.name,
      this.body.phoneNum,
      this.body.info,
      this.body.openTime,
      this.body.provinceId,
      this.body.cityId,
      this.body.roadAddress,
      this.body.detailAddress,
      this.body.limit,
      this.body.type,
      this.body.image,
      this.body.notice,
      storeId,
    ];
    console.log(this.body, params);
    try {
      await StoreStorage.updateStoreDetail(params);
      return { success: true };
    } catch (err) {
      return { success: false, message: `${err}` };
    }
  }
}

module.exports = Store;
