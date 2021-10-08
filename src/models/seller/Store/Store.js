'use strict';
const StoreStorage = require('./StoreStorage');

class Store {
  constructor(body) {
    this.body = body;
  }

  async updateStorePage(storeId) {
    try {
      const params = [
        host.storeName,
        host.imageUrl,
        host.info,
        host.phoneNum,
        host.categoryId,
        host.provinceId,
        host.cityId,
        host.roadAddress,
        host.detailAddress,
        host.type,
        host.openTime,
        host.closeTime,
        host.limit,
        storeId,
      ];
      await StoreStorage.updateStorePage(params);
      return { success: true, message: '스토어 정보 수정이 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 검색에 실패하였습니다. ' };
    }
  }
}

module.exports = Store;
