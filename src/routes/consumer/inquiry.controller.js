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
      const id = req.session.user.id;
      const storeId = req.params.storeId;
      const { type, contents } = req.body;
      if (!storeId) return res.json({ success: false, message: '스토어 id를 입력해주세요. ' });
      if (!type) return res.json({ success: false, message: '문의 유형을 입력해주세요. ' });
      if (!contents) return res.json({ success: false, message: '문의 내용을 입력해주세요. ' });
      const inquiry = new Inquiry(req.body);
      const response = await inquiry.inquiry(id, storeId, type, contents);
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
