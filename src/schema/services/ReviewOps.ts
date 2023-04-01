import ReviewModel, { Review } from "../../models/Review";

export const ReviewOps = {
  reviews: () => ReviewModel.findAll,
  createReview: (_: any, args: Partial<Review>) => ReviewModel.create(args),
  updateReview: () => "Update a review",
  deleteReview: () => "Delete a review",
};
