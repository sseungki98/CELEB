'use strict';
const ReviewStorage = require('./ReviewStorage');

class Review {
  constructor(body) {
    this.body = body;
  }
  async review(id, storeId, ordersId, imageUrl, contents, score) {
    try {
      await ReviewStorage.postReview(id, storeId, ordersId, imageUrl, contents, score);
      return { success: true, message: '리뷰 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 게시에 실패하였습니다. ' };
    }
  }
  async patchReview(id, reviewId) {
    try {
      await ReviewStorage.patchReview(id, reviewId);
      return { success: true, message: '리뷰가 삭제되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 삭제에 실패하였습니다. ' };
    }
  }
  async getReview(storeId) {
    try {
      const getReview = await ReviewStorage.getReview(storeId);
      return getReview;
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 조회에 실패하였습니다.' };
    }
  }
}

module.exports = Review;
