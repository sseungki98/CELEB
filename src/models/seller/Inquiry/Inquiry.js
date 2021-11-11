'use strict';
const InquiryStorage = require('./InquiryStorage');

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async postInquiry(storeId, userId) {
    try {
      const contents = this.body.contents;
      if (!contents) return res.json({ success: false, message: '문의 내용을 입력해주세요. ' });
      await InquiryStorage.postInquiry(storeId, userId, contents);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 답변 등록에 실패하였습니다. ' };
    }
  }
}

module.exports = Inquiry;
