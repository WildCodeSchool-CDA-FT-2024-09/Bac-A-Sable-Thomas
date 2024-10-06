import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repos.entity";
import { Status } from "../statuses/statuses.entity";
import { Language } from "../languages/languages.entity";
import { Comment } from "../comments/comments.entity";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "./src/db/db.sqlite",
  entities: [Repo, Status, Language, Comment],
  synchronize: true,
  // logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
