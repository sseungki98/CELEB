'inquiry strict';
const InquiryStorage = require('./InquiryStorage');

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async inquiry(id, storeId, productId, type, contents) {
    try {
      await InquiryStorage.postInquiry(id, storeId, productId, type, contents);
      return { success: true, message: '문의 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 게시에 실패하였습니다. ' };
    }
  }
  async getInquiry(id, storeId) {
    try {
      const getInquiryRow = await InquiryStorage.getInquiryRow(id, storeId);
      return getInquiryRow;
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 조회에 실패하였습니다. ' };
    }
  }
  async getMyInquiry(id) {
    try {
      const getMyInquiry = await InquiryStorage.getMyInquiry(id);
      return getMyInquiry;
    } catch (err) {
      console.log(err);
      return { success: false, message: '나의 문의 내역 조회에 실패하였습니다. ' };
    }
  }
  async getLastInquiry(id, storeId) {
    try {
      const getLastInquiry = await InquiryStorage.getLastInquiry(id, storeId);
      return getLastInquiry;
    } catch (err) {
      console.log(err);
      return { success: false, message: '스토어 문의 내용 조회에 실패하였습니다. ' };
    }
  }
}

module.exports = Inquiry;
