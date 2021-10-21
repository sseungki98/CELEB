'use strict';
const InquiryStorage = require('./InquiryStorage');

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async postInquiry(storeId, userId, contents) {
    try {
      await InquiryStorage.postInquiry(storeId, userId, contents);
      return { success: true, message: '문의 답변을 등록하였습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 답변 등록에 실패하였습니다. ' };
    }
  }
}

module.exports = Inquiry;
