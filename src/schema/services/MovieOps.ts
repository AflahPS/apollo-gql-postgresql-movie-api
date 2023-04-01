import { Movie, MovieModel } from "../../models/Movie";

export const MovieOps = {
  movies: () => MovieModel.findAll(),
  movie: () => "Movie",
  createMovie: (_: any, args: Partial<Movie>) => {
    console.log('>>>>', args);
    MovieModel.create(args);
  },
  updateMovie: () => "updateMovie",
  deleteMovie: () => "deleteMovie",
};
