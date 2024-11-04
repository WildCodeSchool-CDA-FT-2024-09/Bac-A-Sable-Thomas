import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repos.entity";
import { Status } from "../statuses/statuses.entity";
import { Language } from "../languages/languages.entity";
import { Comment } from "../comments/comments.entity";

dotenv.config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;

// const dataSourceOptions: DataSourceOptions = {
//   type: "sqlite",
//   database: "./src/db/db.sqlite",
//   entities: [Repo, Status, Language, Comment],
//   synchronize: true,
//   // logging: true,
// };

const postgresDataSourceOptions: DataSourceOptions = {
  type: DB_TYPE as any,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Repo, Status, Language, Comment],
  synchronize: true,
  poolSize: 20,
};

export const AppDataSource = new DataSource(postgresDataSourceOptions);

export default AppDataSource;
