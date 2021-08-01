import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { Options } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

// export default {
//   entities: [Post],
//   dbName: "dbx",
//   user: "myuser",
//   password: "mypass",
//   debug: true,
//   type: "postgresql",
// } as const;
console.log(__dirname);
console.log(process.cwd());
const config: Options = {
  entities: [Post, Comment, User],
  dbName: "dbx",
  user: "myuser",
  password: "mypass",
  debug: true,
  type: "postgresql",

  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

export default config;
