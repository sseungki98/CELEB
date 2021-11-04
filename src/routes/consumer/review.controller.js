'use strict';

const Review = require('../../models/consumer/Review/Review');
const ReviewStorage = require('../../models/consumer/Review/ReviewStorage');

const output = {
  //승환: 점수 별 리뷰 count done
  storeReview: async (req, res) => {
    const storeId = req.params.storeId;
    try {
      const storeReview = await ReviewStorage.getStoreReviewCountByStoreId(storeId);
      const reviews = await ReviewStorage.getReviewByStoreId(storeId);
      console.log(storeReview);
      res.render('consumer/storeReview', { storeReview, reviews });
    } catch (err) {
      res.render('common/500error', { err, layout: false });
    }
  },
  review: async (req, res) => {
    if (req.session.user) {
      const orderId = req.params.orderId;
      const userId = req.session.user.id;
      try {
        const checkOrder = await ReviewStorage.checkReviewPosibility(orderId, userId);
        if (checkOrder) {
          res.render('consumer/review');
        } else {
          res.send("<script>alert('접근 권한이 없거나 이미 작성한 리뷰입니다.'); location.href='/mypage';</script>");
        }
      } catch (err) {
        res.render('common/500error', { err, layout: false });
      }
    } else {
      res.render('consumer/login');
    }
  },
};

const process = {
  review: async (req, res) => {
    const userId = req.session.user.id;
    const storeId = req.params.storeId;
    const orderId = req.params.orderId;
    const review = new Review(req.body);
    const response = await review.createReview(userId, storeId, orderId);
    return res.json(response);
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
