import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repos.entity";
import { Status } from "../statuses/statuses.entity";
import { Language } from "../languages/languages.entity";
import { Comment } from "../comments/comments.entity";
import { User } from "../user/user.entity";

dotenv.config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;

const postgresDataSourceOptions: DataSourceOptions = {
  type: DB_TYPE as any,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Repo, Status, Language, Comment],
  synchronize: true,
  poolSize: 20,
};

export const AppDataSource = new DataSource(postgresDataSourceOptions);

export default AppDataSource;
