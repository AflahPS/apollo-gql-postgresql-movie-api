// Construct a schema, using GraphQL schema language
export const typeDefs = `
    type User {
        id: Int
        username: String
        email: String
        createdAt: String
        updatedAt: String
        token: String
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
        movies (
            page: Int
            limit: Int
        ): [Movie]

        reviews (
            page: Int
            limit: Int
        ) : [Review]

        movie (id: Int) : Movie
        searchMovie (
            page: Int
            limit: Int
            movieName: String
            description: String
        ) : [Movie]

        review (id: Int) : Review

        reviewsByMovie (
            page: Int
            limit: Int
            movieId: Int
        ): [Review]
    }

    type Mutation {
        createMovie(
            movieName: String!
            description: String!
            directorName: String!
            releaseDate: String!
        ): Movie

        updateMovie (
            id: Int!
            movieName: String
            description: String
            directorName: String
            releaseDate: String
        ): Movie

        deleteMovie (
            id: ID!
        ) : Boolean!
        
        createReview(
            movieId: Int!
            userId: Int
            rating: Int!
            comment: String!
        ): Review

        updateReview (
            id: Int!
            movieId: Int!
            userId: Int
            rating: Int!
            comment: String!
        ): Review

        deleteReview (
            id: Int!
        ): Boolean!
        
        signUp(
            username: String
            email: String
            password: String
        ): User

        signin(
            email: String
            password: String
        ): User

        changePassword(
            email: String
            oldPassword: String
            newPassword: String
        ): User
    }
`;
