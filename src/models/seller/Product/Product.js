'use strict';
const ProductStorage = require('./ProductStorage');

class Product {
  constructor(body) {
    this.body = body;
  }
  async createProduct(storeId, mainUrl, detailUrl) {
    try {
      const product = this.body;

      const mainParams = [storeId, product.name, mainUrl, product.info, product.price, detailUrl];
      const createProduct = await ProductStorage.createProductByStoreId(mainParams);
      const productId = createProduct[0].insertId;
      for (let i = 0; i < product.optionCategory.length; i++) {
        const categoryResult = await ProductStorage.getCategoryName(product.optionCategory[i].categoryName);
        if (categoryResult.exist == 1) {
          for (let j = 0; j < product.optionCategory[i].optionArray.length; j++) {
            const params = [
              productId,
              categoryResult.id,
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
              createCategoryResult[0].insertId,
              product.optionCategory[i].optionArray[j].name,
              product.optionCategory[i].optionArray[j].price,
              product.optionCategory[i].optionArray[j].type,
            ];
            await ProductStorage.createProductOption(params);
          }
        }
      }
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: '상품 등록에 실패하였습니다. ' };
    }
  }
}

module.exports = Product;
