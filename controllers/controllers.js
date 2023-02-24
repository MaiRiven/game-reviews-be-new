const {
  fetchCategories,
  fetchReviewById,
  fetchReviews,
  fetchCommentsByReviewId,
  writeComment,
} = require("../models/models.js");

const getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => next(err));
};

const getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => next(err));
};

const getReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  fetchReviewById(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
};

const getCommentsByReviewId = (req, res, next) => {
  const reviewId = req.params.review_id;
  const checkArticle = fetchReviewById(reviewId);
  const fetchingComments = fetchCommentsByReviewId(reviewId);

  Promise.all([checkArticle, fetchingComments])
    .then((commentData) => {
      res.status(200).send({ comments: commentData[1] });
    })
    .catch((err) => next(err));
};

const postComment = (req, res, next) => {
  writeComment(req.params.review_id, req.body)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => next(err));
};

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  postComment,
  getCommentsByReviewId,
};
