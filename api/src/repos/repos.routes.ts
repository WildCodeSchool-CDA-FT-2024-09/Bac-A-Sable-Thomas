import express from "express";
import {
  getRepos,
  getRepo,
  addRepo,
  deleteRepo,
  updateRepo,
  getReposByLanguage,
} from "./repos.controller";

import { errorHandler } from "../middleware/errorHandler";

const repoRouter = express.Router();

repoRouter.get("/", getRepos);
repoRouter.get("/:id", getRepo);
repoRouter.get("/languages/:language", getReposByLanguage);

repoRouter.post("/", addRepo);
repoRouter.put("/:id", updateRepo);

repoRouter.delete("/:id", deleteRepo);

repoRouter.use(errorHandler);
export default repoRouter;
