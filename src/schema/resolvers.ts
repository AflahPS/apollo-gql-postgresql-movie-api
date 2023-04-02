import { MovieOps } from "./services/MovieOps";
import { Authentication } from "./services/Authentication";
import { ReviewOps } from "./services/ReviewOps";

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    users: Authentication.users,
    movies: MovieOps.movies,
    reviews: ReviewOps.reviews,

    movie: MovieOps.movie,
    review: ReviewOps.review,

    searchMovie: MovieOps.searchMovies,
    reviewsByMovie: ReviewOps.reviewsByMovie,

    filterMovie: MovieOps.filterMovie,
  },
  Mutation: {
    createMovie: MovieOps.createMovie,
    updateMovie: MovieOps.updateMovie,
    deleteMovie: MovieOps.deleteMovie,

    createReview: ReviewOps.createReview,
    updateReview: ReviewOps.updateReview,
    deleteReview: ReviewOps.deleteReview,

    signUp: Authentication.signup,
    signin: Authentication.signin,
    changePassword: Authentication.changePassword,
  },
};
