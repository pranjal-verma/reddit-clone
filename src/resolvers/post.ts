import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post.js";
import { Context } from "../types";
@Resolver()
class HelloResolver {
  @Query(() => [Post])
  hello(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }

  // insert
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: String,
    @Ctx() { em }: Context
  ): Promise<Post> {
    let post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }
}

export default HelloResolver;
