import { Context } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";

@InputType()
class RegisterInput {
  @Field()
  password: string;

  @Field()
  username: string;
}

@Resolver()
class UserResolver {
  @Query(() => User)
  async getUser(
    @Arg("_id") _id: number,
    @Ctx() orm: Context
  ): Promise<User | undefined> {
    const { em } = orm;

    let findResult = await em.find(User, { _id });

    console.log(
      "🚀 ~ file: user.ts ~ line 12 ~ UserResolver ~ findResult",
      findResult
    );

    if (findResult.length) {
      return findResult[0];
    }
    return undefined;
  }

  @Mutation(() => User)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() orm: Context
  ): Promise<User> {
    const { username, password } = options;
    const { em } = orm;

    let hash = await argon2.hash(password);
    const user = em.create(User, { username, password: hash });
    console.log("🚀 ~ file: user.ts ~ line 55 ~ UserResolver ~ user", user);

    await em.persistAndFlush(user);

    return user;
  }
}
export default UserResolver;
