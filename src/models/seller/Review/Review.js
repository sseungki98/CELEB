'use strict';
const ReviewStorage = require('./ReviewStorage');

class Review {
  constructor(body) {
    this.body = body;
  }
  async getReview(id, page, pageSize) {
    try {
      let start = 0;
      if (page <= 0) {
        page = 1;
      } else {
        start = (page - 1) * pageSize;
      }
      const getReview = await ReviewStorage.getReview(id, start, pageSize);
      return getReview;
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 조회에 실패하였습니다. ' };
    }
  }
  async getReviewReply(reviewId) {
    try {
      const getReviewReply = await ReviewStorage.getReviewReply(reviewId);
      return getReviewReply;
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 답변 조회에 실패하였습니다. ' };
    }
  }
  async createReviewReply(storeId, reviewId, contents) {
    try {
      await ReviewStorage.createReviewReply(storeId, reviewId, contents);
      return { success: true, message: '리뷰 답변 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 답변 게시에 실패하였습니다. ' };
    }
  }
}

module.exports = Review;
