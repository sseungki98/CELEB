'use strict';

const Store = require('../../models/Store/Store');
const StoreStorage = require('../../models/Store/StoreStorage');

const output = {
  storeList: async (req, res) => {
    try {
      const storeList = await StoreStorage.getStoreByCategoryId(req.params.categoryId);
      res.render('consumer/storeList', { storeList });
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
