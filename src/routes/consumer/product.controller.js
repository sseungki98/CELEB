'use strict';

const Product = require('../../models/consumer/Product/Product');
const ProductStorage = require('../../models/consumer/Product/ProductStorage');

const output = {
  productDetail: async (req, res) => {
    try {
      const storeId = req.params.storeId;
      const productId = req.params.productId;
      const product = await ProductStorage.getProductDetail(storeId, productId);
      const option = await ProductStorage.getProductOptionByProductId(productId);
      const disabledDates = await ProductStorage.getDisabledDatesByStoreId(storeId);
      console.log(disabledDates);
      let productOption = {};
      for (let op of option) {
        productOption[op.categoryId] ? productOption[op.categoryId].push(op) : (productOption[op.categoryId] = [op]);
      }
      res.render('consumer/productDetail', { product, productOption, disabledDates });
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
