import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Number)
  @PrimaryKey()
  _id!: number;

  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  updatedAt: Date = new Date();
}
