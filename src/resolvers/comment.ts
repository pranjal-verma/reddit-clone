import { Comment } from "../entities/Comment.js";
import { Context } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
class commentResolver {
  @Query(() => [Comment])
  getComments(@Ctx() { em }: Context): Promise<Comment[]> {
    return em.find(Comment, {});
  }

  @Mutation(() => Comment)
  async addComment(
    @Arg("title") title: String,
    @Ctx() { em }: Context
  ): Promise<Comment> {
    let comment = em.create(Comment, { title });
    await em.persistAndFlush(comment);
    return comment;
  }
}

export default commentResolver;
