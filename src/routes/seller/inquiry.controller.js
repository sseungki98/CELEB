'use strict';

const Inquiry = require('../../models/seller/Inquiry/Inquiry');
const InquiryStorage = require('../../models/seller/Inquiry/InquiryStorage');

const output = {
  inquiry: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
        const response = await InquiryStorage.getInquiryListByStoreId(storeId);
        return res.render('seller/inquiryList', { response, layout: 'seller/layout' });
      } catch (err) {
        return res.render('common/500error', { err, layout: false });
      }
    } else {
      return res.render('seller/login');
    }
  },
  inquiryDetail: async (req, res) => {
    if (req.session.store) {
      try {
        const userId = req.params.userId;
        const storeId = req.session.store.id;
        const response = await InquiryStorage.getInquiryDetailByUserId(userId, storeId);
        return res.render('seller/inquiryDetail', { response, layout: 'seller/layout' });
      } catch (err) {
        return res.render('common/500error', { err, layout: false });
      }
    } else {
      return res.render('seller/login');
    }
  },
};
const process = {
  inquiry: async (req, res) => {
    const storeId = req.session.store.id;
    const userId = req.params.userId;
    const { contents } = req.body;
    const inquiry = new Inquiry(req.body);
    const response = await inquiry.postInquiry(storeId, userId, contents);
    return res.json(response);
  },
};
module.exports = {
  output,
  process,
};
