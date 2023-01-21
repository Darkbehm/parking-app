import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { resolvers } from "./resolvers";
import { connectToMongo } from "./utils/mongo";
import { verifyJwt } from "./utils/jwt";
import Context from "./types/context";
import authChecker from "./utils/authChecker";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import * as jf from "joiful";

dotenv.config();

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    validate: (argValue) => {
      console.log("argValue: ", argValue);
      const { error } = jf.validate(argValue);
      if (error) {
        throw error;
      }
    },
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async (ctx: Context) => {
        const context = ctx;
        if (ctx.req.cookies.accessToken && ctx.req.cookies.accessToken !== "null") {
          const user = verifyJwt<{ id: string }>(ctx.req.cookies.accessToken);
          context.user = user;
        }
        return context;
      },
    })
  );

  // app.listen on express server
  app.listen({ port: 4000 }, () => {
    console.log("App is listening on http://localhost:4000");
  });
  connectToMongo();
};

bootstrap();
