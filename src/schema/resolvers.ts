import { MovieOps } from "./services/MovieOps";
import { Authentication } from "./services/Authentication";
import { ReviewOps } from "./services/ReviewOps";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    users: Authentication.users,
    movies: MovieOps.movies
  },
  Mutation: {
    createMovie: MovieOps.createMovie,
    updateMovie: MovieOps.updateMovie,
    deleteMovie: MovieOps.deleteMovie,

    createReview: ReviewOps.createReview,
    updateReview: ReviewOps.updateReview,
    deleteReview: ReviewOps.deleteReview,

    signUp: Authentication.signup
  },
};
