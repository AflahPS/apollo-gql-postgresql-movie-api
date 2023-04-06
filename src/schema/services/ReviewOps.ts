import { thrower } from "../../utils/errorThrower";
import { Review, ReviewModel } from "../../models";
import { GraphQLError } from "graphql";
import { MyContext } from "../../app";
import { FilterReviewArgs, SortReviewArgs } from "Review";
import { Op, OrderItem, WhereOptions } from "sequelize";

export const ReviewOps = {
  reviews: async (
    _: undefined,
    args: {
      page?: number;
      limit?: number;
      filter?: FilterReviewArgs;
      sort?: SortReviewArgs;
    }
  ) => {
    try {
      const { filter, sort, page, limit } = args;
      // Paginations
      const pageNum = page || 1;
      const _limit = limit || 10;
      const _offset = _limit * (pageNum - 1);

      // Filter
      const where: WhereOptions = {};
      if (filter) {
        if (filter.movieId) {
          where.movieId = filter.movieId;
        }
        if (filter.userId) {
          where.userId = filter.userId;
        }
        if (filter.ratingGreaterThan) {
          where.rating = { [Op.gt]: filter.ratingGreaterThan };
        }
        if (filter.ratingLessThan) {
          where.rating = { [Op.lt]: filter.ratingLessThan };
        }
      }

      // Sort
      const order: OrderItem[] = sort ? [[sort.field, sort.order]] : undefined;

      const reviews = await ReviewModel.findAll({
        offset: _offset,
        limit: _limit,
        where,
        order,
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
      const { page, limit, movieId } = args;

      // pagination
      const pageNum = page || 1;
      const _limit = limit || 10;
      const _offset = _limit * (pageNum - 1);

      const reviews = await ReviewModel.findAll({
        where: { movieId },
        offset: _offset,
        limit: _limit,
      });

      return reviews;
    } catch (err) {
      thrower(err);
    }
  },
  review: (_: undefined, args: { id: number }) => {
    try {
      return ReviewModel.findByPk(args.id);
    } catch (err) {
      thrower(err);
    }
  },
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
