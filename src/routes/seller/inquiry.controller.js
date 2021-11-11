'use strict';

const Inquiry = require('../../models/seller/Inquiry/Inquiry');
const InquiryStorage = require('../../models/seller/Inquiry/InquiryStorage');

const output = {
  inquiry: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
        const inquiryList = await InquiryStorage.getInquiryListByStoreId(storeId);
        return res.render('seller/inquiryList', { inquiryList, layout: 'seller/layout' });
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
        const inquiryDetail = await InquiryStorage.getInquiryDetailByUserId(userId, storeId);
        return res.render('seller/inquiryDetail', { inquiryDetail, layout: 'seller/layout' });
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
    const inquiry = new Inquiry(req.body);
    const response = await inquiry.postInquiry(storeId, userId);
    return res.json(response);
  },
};
module.exports = {
  output,
  process,
};
