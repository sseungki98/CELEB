'use strict';

const Inquiry = require('../../models/consumer/Inquiry/Inquiry');
const InquiryStorage = require('../../models/consumer/Inquiry/InquiryStorage');

const output = {
  inquiryDetail: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const storeId = req.params.storeId;
        const inquiryDetail = await InquiryStorage.getInquiryDetailByStoreId(userId, storeId);
        console.log(inquiryDetail);
        res.render('consumer/inquiryDetail', { inquiryDetail });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
  inquiryList: async (req, res) => {
    if (req.session.user) {
      try {
        const userId = req.session.user.id;
        const inquiryList = await InquiryStorage.getInquiryListByUserId(userId);
        res.render('consumer/inquiryList', { inquiryList });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
};

const process = {
  inquiry: async (req, res) => {
    if (req.session.user) {
      const userId = req.session.user.id;
      const storeId = req.params.storeId;
      const inquiry = new Inquiry(req.body);
      const response = await inquiry.inquiry(userId, storeId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다.' });
    }
  },
};

module.exports = {
  output,
  process,
};
