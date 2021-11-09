'use strict';

const { array } = require('../../config/multer');
const Product = require('../../models/seller/Product/Product');
const ProductStorage = require('../../models/seller/Product/ProductStorage');

const output = {
  registProduct: async (req, res) => {
    if (req.session.store) {
      res.render('seller/registProduct', { layout: 'seller/layout' });
    } else {
      res.render('seller/login');
    }
  },
  productList: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
        const product = await ProductStorage.getProductListByStoreId(storeId);
        res.render('seller/productList', { product, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('seller/login');
    }
  },
  productDetail: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
        const productId = req.params.productId;
        const productDetail = await ProductStorage.getProductDetailByProductId(storeId, productId);
        res.render('seller/editProduct', { productDetail, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('seller/login');
    }
  },
};
const process = {
  createProduct: async (req, res) => {
    const storeId = req.session.store.id;
    const mainImage = req.files['productMain'][0].location;
    let detailImage = req.files['productDetail'];
    if (detailImage) {
      detailImage = detailImage.map((img) => img.location);
      detailImage = JSON.stringify(detailImage);
      detailImage = detailImage.replace(/[\"\[\]]/g, '');
    }
    const product = new Product(req.body);
    const response = await product.createProduct(storeId, mainImage, detailImage);
    return res.json(response);
  },
  updateProduct: async (req, res) => {
    const storeId = req.session.store.id;
    const productId = req.params.productId;
    try {
      const productDetail = await ProductStorage.getProductDetailByProductId(storeId, productId);
      const main = productDetail[0].image;
      let detailImage = productDetail[0].detailImageUrl;
      const mainImage = req.files ? (req.files['productMain'] ? req.files['productMain'][0].location : main) : main;
      if (req.files) {
        detailImage = req.files['productDetail'] ? req.files['productDetail'] : detailImage;
        if (detailImage != productDetail[0].detailImageUrl) {
          detailImage = detailImage.map((img) => img.location);
          detailImage = JSON.stringify(detailImage);
          detailImage = detailImage.replace(/[\"\[\]]/g, '');
        }
      }
      const detailUrl = req.files
        ? req.files['productDetail']
          ? detailImage
          : productDetail[0].detailImageUrl
        : productDetail[0].detailImageUrl;
      const product = new Product(req.body);
      const response = await product.updateProduct(storeId, mainImage, detailUrl, productDetail);
      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: '상품 수정에 실패하였습니다.' });
    }
  },
  deleteProduct: async (req, res) => {
    const storeId = req.session.store.id;
    const productId = req.params.productId;
    const product = new Product();
    const response = await product.deleteProduct(storeId, productId);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
