'use strict';

const e = require('express');
const OrderStorage = require('../../models/seller/Order/OrderStorage');
const Store = require('../../models/seller/Store/Store');
const StoreStorage = require('../../models/seller/Store/StoreStorage');
const ProductStorage = require('../../models/seller/Product/ProductStorage');

const output = {
  storePage: async (req, res) => {
    //TODO: code review
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const myStorePageDetail = await StoreStorage.getStoreDetailByStoreId(storeId);
        if (myStorePageDetail) {
          console.log(getStoreInfo);
          res.render('/s/storePage', { myStorePage: myStorePageDetail });
        } else {
          res.render('common/500error', { success: false, message: '잘못된 접근입니다. ' });
        }
      } catch (err) {
        res.render('common/500error', { err });
      }
    } else {
      res.render('/s/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
  main: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const productRank = await ProductStorage.getProductRankByStoreId(storeId);
        const recentOrderProduct = await OrderStorage.getRecentOrderProductByStoreId(storeId);
        const recentOrderCount = await OrderStorage.getRecentOrderCountByStoreId(storeId);
        const monthStatistics = await StoreStorage.getMonthStatisticsByStoreId(storeId);
        console.log(productRank);
        console.log(recentOrderProduct);
        console.log(recentOrderCount);
        console.log(monthStatistics);
        res.render('seller/sellerMain', { productRank, recentOrderProduct, recentOrderCount, monthStatistics });
      } catch (err) {
        res.render('common/500error', { err });
      }
    } else {
      res.render('seller/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};

const process = {
  storePage: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const storeDetail = await StoreStorage.getStoreDetailByStoreId(storeId);
        const name = req.body.name ? req.body.name : storeDetail.name;
        const phoneNum = req.body.phoneNum ? req.body.phoneNum : storeDetail.phoneNum;
        const info = req.body.info ? req.body.info : storeDetail.info;
        const openTime = req.body.openTime ? req.body.openTime : storeDetail.OperatingHour;
        const provinceId = req.body.provinceId ? req.body.provinceId : storeDetail.provinceId;
        const cityId = req.body.cityId ? req.body.cityId : storeDetail.cityId;
        const roadAddress = req.body.roadAddress ? req.body.roadAddress : storeDetail.roadAddress;
        const detailAddress = req.body.detailAddress ? req.body.detailAddress : storeDetail.detailAddress;
        const limit = req.body.limit ? req.body.limit : storeDetail.limit;
        const type = req.body.type ? req.body.type : storeDetail.type;
        const image = req.file ? req.file.location : storeDetail.Image;
        const notice = req.body.notice ? req.body.notice : storeDetail.notice;
        const params = [
          name,
          phoneNum,
          info,
          openTime,
          provinceId,
          cityId,
          roadAddress,
          detailAddress,
          limit,
          type,
          image,
          notice,
          storeId,
        ];
        if (storeDetail) {
          const updateStoreInfo = await StoreStorage.updateStorePageDetail(params);
          return res.json(updateStoreInfo);
        } else {
          return res.json({ success: false, message: '잘못된 접근입니다. ' });
        }
      } catch (err) {
        console.log(err);
        return res.json({ success: false, message: '잘못된 데이터를 입력하였습니다. ' });
      }
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

module.exports = {
  output,
  process,
};
