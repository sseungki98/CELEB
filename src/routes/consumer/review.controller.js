'use strict';

const Review = require('../../models/Review/Review');

const output = {};

const process = {
  review: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const storeId = req.params.storeId;
      const { ordersId, imageUrl, contents, score } = req.body;
      if (!storeId) return res.json({ success: false, message: '스토어 id를 입력해주세요. ' });
      if (!ordersId) return res.json({ success: false, message: '주문 id를 입력해주세요. ' });
      if (!contents) return res.json({ success: false, message: '리뷰 내용을 입력해주세요. ' });
      if (!score) return res.json({ success: false, message: '리뷰 점수를 입력해주세요. (0.5~5.0)' });
      const review = new Review(req.body);
      const response = await review.review(id, storeId, ordersId, imageUrl, contents, score);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다. ' });
    }
  },
  patchReview: async (req, res) => {
    if (req.session.user) {
      const id = req.session.user.id;
      const reviewId = req.params.reviewId;
      if (!reviewId) return res.json({ success: false, message: '리뷰 id를 입력해주세요. ' });
      const review = new Review(req.body);
      const response = await review.patchReview(id, reviewId);
      return res.json(response);
    } else {
      return res.json({ success: false, message: '로그인이 되어있지 않습니다. ' });
    }
  },
};

module.exports = {
  output,
  process,
};
