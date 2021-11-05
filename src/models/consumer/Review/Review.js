'use strict';
const ReviewStorage = require('./ReviewStorage');

class Review {
  constructor(body) {
    this.body = body;
  }
  async createReview(userId, storeId, orderId) {
    try {
      const review = this.body;
      if (!review.contents) return res.json({ success: false, message: '리뷰 내용을 입력해주세요. ' });
      if (!review.score) return res.json({ success: false, message: '리뷰 점수를 입력해주세요.' });
      const params = [userId, storeId, orderId, review.imageUrl, review.contents, review.score];
      await ReviewStorage.createReview(params);
      return { success: true, storeId };
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
