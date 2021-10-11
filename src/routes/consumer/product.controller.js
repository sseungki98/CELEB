'use strict';

const Product = require('../../models/consumer/Product/Product');
const ProductStorage = require('../../models/consumer/Product/ProductStorage');

const output = {
  productDetail: async (req, res) => {
    try {
      if (!req.params.storeId) return res.render('common/500error', { storeId: false });
      if (!req.params.productId) return res.render('common/500error', { productId: false });
      const productDetailInfo = await ProductStorage.getProductDetailInfo(req.params.storeId, req.params.productId);
      const productOptionInfo = await ProductStorage.getProductOptionInfoByProductId(req.params.productId);
      res.render('consumer/productDetail', { productDetailInfo, productOptionInfo });
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
