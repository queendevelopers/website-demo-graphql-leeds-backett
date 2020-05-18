import { GraphQLServer,PubSub } from "graphql-yoga";
import db from './db'

import Post from './resolver/Post'
import User from './resolver/User'
import Comment from './resolver/Comment'
import Query from './resolver/Query'
import Mutation from './resolver/Mutation'
import Subscription from './resolver/Subscription'
import prisma from './prisma'

const pubsub=new PubSub()
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    User, Post, Comment, Query, Mutation, Subscription
  },  context(request) {
    return{
    db,
    pubsub,
    prisma,
    request
  }
  }
});
server.start((url) => console.log(`Sever is running at ${url}`));
