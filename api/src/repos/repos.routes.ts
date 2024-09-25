import express from "express";
import { getRepos, getRepo } from "./repos.controller";

const repoRouter = express.Router();

repoRouter.get("/", getRepos);
repoRouter.get("/:id", getRepo);

export default repoRouter;
