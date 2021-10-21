'use strict';

const Inquiry = require('../../models/seller/Inquiry/Inquiry');
const InquiryStorage = require('../../models/seller/Inquiry/InquiryStorage');

const output = {
  inquiry: async (req, res) => {
    if (req.session.user) {
      const storeId = req.session.user.id;
      const response = await InquiryStorage.getInquiryListByStoreId(storeId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
  inquiryDetail: async (req, res) => {
    if (req.session.user) {
      const userId = req.params.userId;
      const storeId = req.session.user.id;
      const response = await InquiryStorage.getInquiryByUserId(userId, storeId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};
const process = {};
module.exports = {
  output,
  process,
};
