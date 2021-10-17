'use strict';

const Product = require('../../models/seller/Product/Product');
const ProductStorage = require('../../models/seller/Product/ProductStorage');

const output = {
  productList: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const productList = await ProductStorage.getProductListByStoreId(id);
      console.log(productList);
      res.render('/s/store/product', { productList: productList });
    } else {
      res.render('/s/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
  productDetail: async (req, res) => {
    if (req.session.user) {
      const storeId = req.session.user.id;
      const productId = req.body;
      const productDetail = await ProductStorage.getProductDetailByProductId(storeId, productId);
      console.log(productDetail);
      res.render('/s/store/product/productDetail', { productDetail: productDetail });
    } else {
      res.render('/s/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};
const process = {};

module.exports = {
  output,
  process,
};
