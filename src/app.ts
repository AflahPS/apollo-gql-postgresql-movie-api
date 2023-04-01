import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { sequelize } from "./sequelize";
import UserModel from "./models/User";
import { MovieModel } from "./models/Movie";
import ReviewModel from "./models/Review";

(async () => {
  await sequelize.addModels([UserModel, MovieModel, ReviewModel]);
  await sequelize.sync();

  const server = new ApolloServer({ typeDefs, resolvers });
  startStandaloneServer(server).then(({ url }) => {
    console.log(`🚀 Server ready at http://localhost:4000${url}`);
  });
})();
