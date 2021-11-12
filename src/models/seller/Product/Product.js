'use strict';
const ProductStorage = require('./ProductStorage');

class Product {
  constructor(body) {
    this.body = body;
  }
  async createProduct(storeId, mainUrl, detailUrl) {
    try {
      const product = this.body;
      const mainParams = [storeId, product.productName, mainUrl, product.info, product.productPrice, detailUrl];
      const createProduct = await ProductStorage.createProductByStoreId(mainParams);
      const productId = createProduct.insertId;
      const optionCategory = JSON.parse(product.optionCategory);
      for (let i = 0; i < optionCategory.length; i++) {
        const categoryResult = await ProductStorage.getCategoryName(optionCategory[i].categoryName);
        if (categoryResult[0]) {
          for (let j = 0; j < optionCategory[i].optionArray.length; j++) {
            const params = [
              productId,
              categoryResult[0].id,
              optionCategory[i].optionArray[j].name,
              optionCategory[i].optionArray[j].price,
              optionCategory[i].optionArray[j].type,
            ];
            console.log(params);
            await ProductStorage.createProductOption(params);
          }
        } else {
          const createCategoryResult = await ProductStorage.createCategory(optionCategory[i].categoryName);
          for (let j = 0; j < optionCategory[i].optionArray.length; j++) {
            const params = [
              productId,
              createCategoryResult.insertId,
              optionCategory[i].optionArray[j].name,
              optionCategory[i].optionArray[j].price,
              optionCategory[i].optionArray[j].type,
            ];
            console.log(params);
            await ProductStorage.createProductOption(params);
          }
        }
      }
      return { success: true, message: '상품 등록이 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '상품 등록에 실패하였습니다. ' };
    }
  }
  async updateProduct(storeId, mainUrl, detailUrl, productDetail) {
    try {
      const product = this.body;
      const productName = product.productName;
      const info = product.info;
      const price = product.productPrice;
      const mainParams = [productName, mainUrl, info, price, detailUrl, storeId, productDetail[0].productId];
      const updateProduct = await ProductStorage.updateProductByProductId(mainParams);
      console.log(updateProduct);

      const productId = productDetail[0].productId;
      const setDefault = await ProductStorage.setDefaulProductOptionByProductId(productId);
      console.log(setDefault.success);
      if (setDefault.success) {
        for (let i = 0; i < product.optionCategory.length; i++) {
          const categoryResult = await ProductStorage.getCategoryName(product.optionCategory[i].categoryName);
          if (categoryResult[0]) {
            for (let j = 0; j < product.optionCategory[i].optionArray.length; j++) {
              const params = [
                productId,
                categoryResult[0].id,
                product.optionCategory[i].optionArray[j].name,
                product.optionCategory[i].optionArray[j].price,
                product.optionCategory[i].optionArray[j].type,
              ];
              await ProductStorage.createProductOption(params);
            }
          } else {
            const createCategoryResult = await ProductStorage.createCategory(product.optionCategory[i].categoryName);
            for (let j = 0; j < product.optionCategory[i].optionArray.length; j++) {
              const params = [
                productId,
                createCategoryResult.insertId,
                product.optionCategory[i].optionArray[j].name,
                product.optionCategory[i].optionArray[j].price,
                product.optionCategory[i].optionArray[j].type,
              ];
              await ProductStorage.createProductOption(params);
            }
          }
        }
        return { success: true, message: '상품 수정이 완료되었습니다. ' };
      } else {
        return { success: false, message: '상품 수정에 실패하였습니다. ' };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: '상품 수정에 실패하였습니다. ' };
    }
  }

  async deleteProduct(storeId, productId) {
    try {
      const response = await ProductStorage.deleteProductByProductId(storeId, productId);
      return res.json(response);
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: '상품 삭제에 실패하였습니다.' });
    }
  }
}

module.exports = Product;
