'use strict';

const Product = require('../../models/consumer/Product/Product');

const output = {
  productDetail: async (req, res) => {
    res.render('consumer/productDetail');
  },
};

const process = {};

module.exports = {
  output,
  process,
};
