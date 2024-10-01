import express from "express";
import {
  getRepos,
  getRepo,
  addRepo,
  deleteRepo,
  updateRepo,
} from "./repos.controller";

const repoRouter = express.Router();

repoRouter.get("/", getRepos);
repoRouter.get("/:id", getRepo);

repoRouter.post("/", addRepo);
repoRouter.put("/:id", updateRepo);

repoRouter.delete("/:id", deleteRepo);
export default repoRouter;
