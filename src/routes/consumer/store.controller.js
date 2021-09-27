'use strict';

const Store = require('../../models/Store/Store');
const StoreStorage = require('../../models/Store/StoreStorage');

const output = {
  storePage: async (req, res) => {
    if (!req.params.storeId) return res.render('common/500error', { storeId: false });
    const storeDetailInfo = await StoreStorage.getStoreInfoByStoreId(req.params.storeId); //스토어 상세정보
    const productInfo = await StoreStorage.getProductInfoByStoreId(req.params.storeId); //상품정보
    res.render('/storePage', { storeDetailInfo, productInfo });
  },
  storeList: async (req, res) => {
    try {
      const storeList = await StoreStorage.getStoreByCategoryId(req.params.categoryId);
      res.render('consumer/storeList', { storeList });
    } catch (err) {
      res.render('common/500error', { err, layout: false });
    }
  },
};

const process = {};

module.exports = {
  output,
  process,
};
