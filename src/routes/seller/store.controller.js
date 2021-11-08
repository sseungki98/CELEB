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
        const storeDetail = await StoreStorage.getStoreDetailByStoreId(storeId);
        res.render('seller/editStoreDetail', { storeDetail, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('seller/login', { layout: 'seller/layout' });
    }
  },
  main: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const productRank = await ProductStorage.getProductRankByStoreId(storeId);
        const recentOrder = await OrderStorage.getRecentOrderProductByStoreId(storeId);
        const orderCount = await OrderStorage.getRecentOrderCountByStoreId(storeId);
        const statistics = await StoreStorage.getMonthStatisticsByStoreId(storeId);
        res.render('seller/storeMain', { productRank, recentOrder, orderCount, statistics, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('seller/login', { layout: 'seller/layout' });
    }
  },
};

const process = {
  storePage: async (req, res) => {
    const storeId = req.session.user.id;
    const store = new Store(req.body);
    const response = await store.updateStoreDetail(storeId);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
