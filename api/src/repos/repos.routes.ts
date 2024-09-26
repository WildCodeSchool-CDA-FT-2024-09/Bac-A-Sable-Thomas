import express from "express";
import { getRepos, getRepo, addRepo } from "./repos.controller";
import { validateRepo } from "./repos.validate";

const repoRouter = express.Router();

repoRouter.get("/", getRepos);
repoRouter.get("/:id", getRepo);

repoRouter.post("/", validateRepo, addRepo);

export default repoRouter;
