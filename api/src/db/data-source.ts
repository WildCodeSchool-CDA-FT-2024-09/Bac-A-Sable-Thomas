import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repos.entity";
import { Status } from "../statuses/statuses.entity";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "./src/db/db.sqlite",
  entities: [Repo, Status],
  synchronize: true,
  // logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
