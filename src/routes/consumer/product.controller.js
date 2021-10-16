'use strict';

const Product = require('../../models/consumer/Product/Product');
const ProductStorage = require('../../models/consumer/Product/ProductStorage');

const output = {
  productDetail: async (req, res) => {
    try {
      if (!req.params.storeId) return res.render('common/500error', { storeId: false });
      if (!req.params.productId) return res.render('common/500error', { productId: false });
      const product = await ProductStorage.getProductDetail(req.params.storeId, req.params.productId); //TODO: 하나로 묶기, 하루최대 주문량 출력
      const option = await ProductStorage.getProductOptionByProductId(req.params.productId);
      let productOption = {};
      for (let op of option) {
        productOption[op.categoryId] ? productOption[op.categoryId].push(op) : (productOption[op.categoryId] = [op]);
      }
      res.render('consumer/productDetail', { product, productOption });
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
