import { thrower } from "../../utils/errorThrower";
import { Review, ReviewModel } from "../../models";
import { GraphQLError } from "graphql";
import { MyContext } from "../../app";

export const ReviewOps = {
  reviews: async (_: undefined, args: { page?: number; limit?: number }) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);

      const reviews = await ReviewModel.findAll({
        offset: offset,
        limit: limit,
      });
      return reviews;
    } catch (err) {
      thrower(err);
    }
  },
  reviewsByMovie: async (
    _: undefined,
    args: { page?: number; limit?: number; movieId: number }
  ) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);

      const reviews = await ReviewModel.findAll({
        where: {
          movieId: args.movieId,
        },
        offset: offset,
        limit: limit,
      });

      return reviews;
    } catch (err) {
      thrower(err);
    }
  },
  review: (_: undefined, args: { id: number }) => ReviewModel.findByPk(args.id),
  createReview: async (_: undefined, args: Partial<Review>, ctx: MyContext) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      args.userId = user.id;
      const newReview = await ReviewModel.create(args);
      return newReview;
    } catch (err) {
      thrower(err);
    }
  },
  updateReview: async (
    parent: undefined,
    args: Partial<Review>,
    ctx: MyContext
  ) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id, ...toUpdate } = args;
      const selected = await ReviewModel.findByPk(id);
      if (!selected) throw new GraphQLError(`Could not find the document !`);
      if (selected.userId !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const review = await selected.update(toUpdate);
      if (!review) {
        throw new GraphQLError(`Review not found !`);
      }
      return review;
    } catch (err) {
      thrower(err);
    }
  },
  deleteReview: async (
    parent: undefined,
    args: { id: string },
    ctx: MyContext
  ) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id } = args;
      const selected = await ReviewModel.findByPk(id);
      if (!selected) throw new GraphQLError(`Could not find the document !`);
      if (selected.userId !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      if (!selected) throw new GraphQLError(`Review not found !`);
      await selected.destroy();
      return true;
    } catch (err) {
      thrower(err);
    }
  },
};
