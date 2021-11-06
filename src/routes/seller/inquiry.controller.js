'use strict';

const Inquiry = require('../../models/seller/Inquiry/Inquiry');
const InquiryStorage = require('../../models/seller/Inquiry/InquiryStorage');

const output = {
  inquiry: async (req, res) => {
    if (req.session.user) {
      try {
        const storeId = req.session.user.id;
        const response = await InquiryStorage.getInquiryListByStoreId(storeId);
        return res.render('seller/inquiryList', { response, layout: 'seller/layout' });
      } catch (err) {
        return res.render('common/500error', { err, layout: false });
      }
    } else {
      return res.render('seller/login', { layout: 'seller/layout' });
    }
  },
  inquiryDetail: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.params.userId;
        const storeId = req.session.user.id;
        const response = await InquiryStorage.getInquiryDetailByUserId(userId, storeId);
        return res.render('seller/inquiryDetail', { response, layout: 'seller/layout' });
      } catch (err) {
        return res.render('common/500error', { err, layout: false });
      }
    } else {
      return res.render('seller/login', { layout: 'seller/layout' });
    }
  },
};
const process = {
  inquiry: async (req, res) => {
    if (req.session.user) {
      const storeId = req.session.user.id;
      const userId = req.params.userId;
      const { contents } = req.body;
      const inquiry = new Inquiry(req.body);
      const response = await inquiry.postInquiry(storeId, userId, contents);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '스토어 로그인이 되어있지 않습니다. ' });
    }
  },
};
module.exports = {
  output,
  process,
};
