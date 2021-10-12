'use strict';

const Store = require('../../models/consumer/Store/Store');
const StoreStorage = require('../../models/consumer/Store/StoreStorage');
const ProductStorage = require('../../models/consumer/Product/ProductStorage');

const output = {
  popularStore: async (req, res) => {
    try {
      const popularStore = await StoreStorage.getPopularStore();
      res.render('consumer/main', { popularStore });
    } catch (err) {
      res.render('common/500error', { err, layout: false });
    }
  },
  storeDetail: async (req, res) => {
    try {
      const storeId = req.params.storeId;
      const storeDetail = await StoreStorage.getStoreDetailByStoreId(storeId); //TODO: 하나로 묶기 //스토어 상세정보
      const product = await ProductStorage.getProductByStoreId(storeId); //상품정보
      res.render('consumer/storeDetail', { storeDetail, product });
    } catch (err) {
      res.render('common/500error', { err, layout: false });
    }
  },
  storeList: async (req, res) => {
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
  },

  storeReservationDate: async (req, res) => {
    try {
      if (!req.params.storeId) return res.render('common/500error', { storeId: false });
      const productReservationDateInfo = await StoreStorage.getProductReservationDateByProductId(req.params.storeId);
      res.render('consumer/reservationDate', { productReservationDateInfo });
    } catch (err) {
      res.render('common/500error', { err, layout: false });
    }
  },
  searchStore: async (req, res) => {
    const { keyword } = req.query;
    const categoryName = '%' + keyword + '%';
    const storeName = '%' + keyword + '%';
    const productName = '%' + keyword + '%';
    const provinceName = '%' + keyword + '%';
    const cityName = '%' + keyword + '%';
    if (!keyword) return res.json({ success: false, message: '검색어를 입력해주세요. ' });
    const params = [categoryName, storeName, productName, provinceName, cityName];
    const store = new Store(req.body);
    const response = await store.searchStore(params);
    return res.json(response);
  },
};

const process = {};

module.exports = {
  output,
  process,
};
