require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";
import pubsub from "./pubsub";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  uploads : false,
  typeDefs,
  resolvers,
  context: async ({req}) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
const sin = async () => {
  await apollo.start();
  apollo.applyMiddleware({app});
}
app.use("/static",express.static("uploads"));
sin();

app.listen({port:PORT}, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
