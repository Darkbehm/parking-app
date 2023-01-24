import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import Context from './types/context';
import { connectToMongo, authChecker, validate, context } from './utils/';

dotenv.config();

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    validate,
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer<Context>({
    schema,
    includeStacktraceInErrorResponses: app.get('env') === 'development',
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use(json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context,
    }),
  );

  await connectToMongo();

  app.listen({ port: process.env.PORT || 4000 }, () => {
    // eslint-disable-next-line no-console
    console.log(`Api is listening on ${process.env.PORT}`);
  });
};

bootstrap();
