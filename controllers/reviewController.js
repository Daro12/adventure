const Review = require("./../models/reviewModel");
// const catchAsync = require("./../utils/catchAsync");
const factory = require("./../controllers/handlerFactory");

// GET ALL REVIEWS
exports.getAllReviews = factory.getAll(Review);
/*
exports.getAllReviews = catchAsync(async (req, res, next) => {
  // allow nested route
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  //const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    result: reviews.length,
    data: {
      reviews,
    },
  });
});
*/

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  next();
};
// CREATE REIVEW
exports.createReview = factory.createOne(Review);
/*
exports.createReview = catchAsync(async (req, res, next) => {
  // allow nested route
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
*/
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
