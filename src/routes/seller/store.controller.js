'use strict';

const Store = require('../../models/Store/Store');
const StoreStorage = require('../../models/Store/StoreStorage');

const output = {
  register: (req, res) => {
    res.render('seller/register');
  },
};

const process = {};

module.exports = {
  output,
  process,
};
