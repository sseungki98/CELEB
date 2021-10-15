'use strict';
const ReviewStorage = require('./ReviewStorage');

class Review {
  constructor(body) {
    this.body = body;
  }
  async review(userId, storeId, orderId, imageUrl, contents, score) {
    try {
      await ReviewStorage.postReview(userId, storeId, orderId, imageUrl, contents, score);
      return { success: true, message: '리뷰 게시가 완료되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 게시에 실패하였습니다. ' };
    }
  }
  async patchReview(userId, reviewId) {
    try {
      await ReviewStorage.patchReview(userId, reviewId);
      return { success: true, message: '리뷰가 삭제되었습니다. ' };
    } catch (err) {
      console.log(err);
      return { success: false, message: '리뷰 삭제에 실패하였습니다. ' };
    }
  }
}

module.exports = Review;
