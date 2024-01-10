require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
