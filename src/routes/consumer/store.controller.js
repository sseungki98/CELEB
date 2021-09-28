'use strict';

const Store = require('../../models/Store/Store');
const StoreStorage = require('../../models/Store/StoreStorage');

const output = {
  storePage: async (req, res) => {
    if (req.session.user) {
      try {
        if (!req.params.storeId) return res.render('common/500error', { storeId: false });
        const storeDetailInfo = await StoreStorage.getStoreInfoByStoreId(req.params.storeId); //스토어 상세정보
        const productInfo = await StoreStorage.getProductInfoByStoreId(req.params.storeId); //상품정보
        res.render('counsumer/storePage', { storeDetailInfo, productInfo });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('common/500error', { err, login: false });
    }
  },
  storeList: async (req, res) => {
    if (req.session.user) {
      try {
        if (!req.body.cityId && !req.body.provinceId) {
          const storeListByDefault = await StoreStorage.getStoreByCategoryId(req.params.categoryId);
          res.render('consumer/storeList', { storeListByDefault });
        } else if (req.body.provinceId && !req.body.cityId) {
          const storeListByProvinceId = await StoreStorage.getStoreByCategoryIdWithProvinceId(req.params.categoryId, req.body.ProvinceId);
          res.render('consumer/storeList', { storeListByProvinceId });
        } else {
          const storeListByCityId = await StoreStorage.getStoreByCategoryIdWithCityId(
            req.params.categoryId,
            req.body.ProvinceId,
            req.body.cityId,
          );
          res.render('consumer/storeList', { storeListByCityId });
        }
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('common/500error', { err, login: false });
    }
  },
};

const process = {};

module.exports = {
  output,
  process,
};
