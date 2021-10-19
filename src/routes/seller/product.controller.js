'use strict';

const Product = require('../../models/seller/Product/Product');
const ProductStorage = require('../../models/seller/Product/ProductStorage');

const output = {
  productList: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const productList = await ProductStorage.getProductListByStoreId(id);
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
      res.render('/s/store/product/productDetail', { productDetail: productDetail });
    } else {
      res.render('/s/login', { success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};
const process = {
  product: async (req, res) => {
    if (req.session.user) {
      const storeId = req.session.user.id;
      const mainImage = req.files['productMain'][0].location;
      let detailImage = req.files['productDetail'];
      detailImage = detailImage.map(img => img.location);

      const product = new Product(req.body);
      const response = product.createProduct(storeId, mainImage, detailImage);

      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
  deleteProduct: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const productId = req.body;
        const response = await ProductStorage.deleteProductByProductId(storeId, productId);

        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.json({ success: false, message: '상품 삭제에 실패하였습니다.' });
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
