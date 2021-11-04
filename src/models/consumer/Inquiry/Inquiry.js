'inquiry strict';
const InquiryStorage = require('./InquiryStorage');

class Inquiry {
  constructor(body) {
    this.body = body;
  }
  async inquiry(id, storeId) {
    const contents = this.body.contents;
    console.log(contents);
    if (!contents) return res.json({ success: false, message: '문의 내용을 입력해주세요. ' });
    try {
      await InquiryStorage.createInquiry(id, storeId, contents);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: '문의 게시에 실패하였습니다. ' };
    }
  }
  // TODO: 수정 필요 합쳐야 함
  // async getLastInquiry(id, storeId) {
  //   try {
  //     const getLastInquiry = await InquiryStorage.getLastInquiry(id, storeId);
  //     return getLastInquiry;
  //   } catch (err) {
  //     console.log(err);
  //     return { success: false, message: '스토어 문의 내용 조회에 실패하였습니다. ' };
  //   }
  // }
}

module.exports = Inquiry;
