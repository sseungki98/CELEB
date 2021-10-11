'inquiry strict';
const InquiryStorage = require('./InquiryStorage');

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async inquiry(id, storeId, productId, type, contents) {
    try {
      await InquiryStorage.createInquiry(id, storeId, productId, type, contents);
      return { success: true, message: '문의 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 게시에 실패하였습니다. ' };
    }
  }
  // TODO: 수정 필요 합쳐야 함
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
