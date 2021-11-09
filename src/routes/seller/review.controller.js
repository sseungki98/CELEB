'use strict';

const Review = require('../../models/seller/Review/Review');
const ReviewStorage = require('../../models/seller/Review/ReviewStorage');

const output = {
  review: async (req, res) => {
    if (req.session.store) {
      try {
        const storeId = req.session.store.id;
        const page = req.query.page ? req.query.page : 1;
        const pageSize = 10;
        let start = 0;
        if (page <= 0) {
          page = 1;
        } else {
          start = (page - 1) * pageSize;
        }
        const review = await ReviewStorage.getReviewByStoreId(storeId, start, pageSize);
        res.render('seller/storeReview', { review, layout: 'seller/layout' });
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('seller/login');
    }
  },
};
const process = {
  reviewReply: async (req, res) => {
    const reviewId = req.params.reviewId;
    const { contents } = req.body;
    const storeId = req.session.store.id;
    if (!reviewId) return res.json({ success: false, message: '리뷰 id를 입력해주세요. ' });
    if (!contents) return res.json({ success: false, message: '리뷰 답변 내용을 입력해주세요. ' });
    const review = new Review(req.body);
    const response = await review.createReviewReply(storeId, reviewId, contents);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
