// Construct a schema, using GraphQL schema language
export const typeDefs = `
    type User {
        id: Int
        username: String
        email: String
        createdAt: String
        updatedAt: String
    }

    type Movie {
        id: Int
        movieName: String
        description: String
        directorName: String
        releaseDate: String
        createdAt: String
        updatedAt: String
    }

    type Review {
        id: Int
        movieId: Int
        userId: Int
        rating: Int
        comment: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        users: [User]
        movies: [Movie]
        reviews: [Review]
    }

    type Mutation {
        createMovie(
            movieName: String
            description: String
            directorName: String
            releaseDate: String
        ): Movie
        updateMovie: String
        deleteMovie: String
        
        createReview(
            id: Int
            movieId: Int
            userId: Int
            rating: Int
            comment: String
        ): Review
        updateReview: Review
        deleteReview: String
        signUp(
            username: String
            email: String
            password: String
        ): User
    }
`;

// type Authentication {
//     signup: String
//     signin: String
//     changePassword: String
// }

// type MovieOps {
//     movies: [Movie]
//     movie: String
//     createMovie: String
//     updateMovie: String
//     deleteMovie: String
// }

// type ReviewOps {
//     reviews: [Review]
//     createReview: String
//     updateReview: String
//     deleteReview: String
// }
