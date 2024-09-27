import express from "express";
import {
  getRepos,
  getRepo,
  addRepo,
  deleteRepo,
  updateRepo,
} from "./repos.controller";
import { validateRepo } from "./repos.validate";

const repoRouter = express.Router();

repoRouter.get("/", getRepos);
repoRouter.get("/:id", getRepo);

repoRouter.post("/", validateRepo, addRepo);
repoRouter.put("/:id", validateRepo, updateRepo);

repoRouter.delete("/:id", deleteRepo);
export default repoRouter;
