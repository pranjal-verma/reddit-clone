import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import HelloResolver from "./resolvers/hello.js";
import PostResolver from "./resolvers/post.js";
import CommentResolver from "./resolvers/comment.js";
import UserResolver from "./resolvers/user.js";
// import { Comment } from "./entities/Comment.js";
main();

async function main(): Promise<any> {
  const orm = await MikroORM.init(microConfig);
  try {
    // await orm.getMigrator().createMigration();
    await orm.getMigrator().up();

    const app = express();
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, CommentResolver, UserResolver],
        validate: false,
      }),

      context: { em: orm.em },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(8080, () => console.log("server running"));
  } catch (error) {
    console.error(error);
  }
}
