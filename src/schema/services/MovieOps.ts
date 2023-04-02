import { GraphQLError } from "graphql";
import { Movie, MovieModel } from "../../models";
import { thrower } from "../../utils/errorThrower";
import { MyContext } from "../../app";

export const MovieOps = {
  movies: async (_: undefined, args: { page?: number; limit?: number }) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);

      const movies = await MovieModel.findAll({
        offset: offset,
        limit: limit,
      });

      return movies;
    } catch (err) {
      thrower(err);
    }
  },
  searchMovies: async (
    _: undefined,
    args: { page?: number; limit?: number } & Partial<Movie>
  ) => {
    try {
      const page = args?.page || 1;
      const limit = args?.limit || 10;
      const offset = limit * (page - 1);

      const movies = await MovieModel.findAll({
        where: {
          movieName: `${args.movieName}`,
          description: `${args.description}`,
        },
        offset: offset,
        limit: limit,
      });

      return movies;
    } catch (err) {
      thrower(err);
    }
  },
  filterMovie: async (parent: undefined, args: Partial<Movie>) => {
    try {
      // TODO: Validate
      const filterObj = { ...args };
      const movies = await MovieModel.findAll({ where: filterObj });
      return movies;
    } catch (err) {
      thrower(err);
    }
  },
  movie: async (parent: undefined, args: { id: number }) => {
    try {
      // TODO: Validate
      const { id } = args;
      console.log(id);

      const movie = await MovieModel.findByPk(id);
      if (!movie) throw new GraphQLError(`Movie not found!`);
      return movie;
    } catch (err) {
      thrower(err);
    }
  },
  createMovie: async (
    parent: undefined,
    args: Partial<Movie>,
    ctx: MyContext
  ) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);

      // TODO: Validate
      args.createdBy = user.id;
      args.releaseDate = new Date(args.releaseDate);
      const newMovie = await MovieModel.create(args);
      console.log({ newMovie });

      return newMovie;
    } catch (err) {
      thrower(err);
    }
  },
  updateMovie: async (
    parent: undefined,
    args: Partial<Movie>,
    ctx: MyContext
  ) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id, ...toUpdate } = args;
      const selected = await MovieModel.findByPk(id);
      if (selected.createdBy !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const movie = await selected.update(toUpdate);
      if (!movie) {
        throw new GraphQLError(`Movie not found !`);
      }
      return movie;
    } catch (err) {
      thrower(err);
    }
  },
  deleteMovie: async (
    parent: undefined,
    args: { id: string },
    ctx: MyContext
  ) => {
    try {
      const { user } = ctx;
      if (!user)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      const { id } = args;
      const selected = await MovieModel.findByPk(id);
      if (selected.createdBy !== user.id)
        throw new GraphQLError(`You are not allowed to perform this action !`);
      if (!selected) throw new GraphQLError(`Movie not found !`);
      await selected.destroy();
      return true;
    } catch (err) {
      thrower(err);
    }
  },
};
