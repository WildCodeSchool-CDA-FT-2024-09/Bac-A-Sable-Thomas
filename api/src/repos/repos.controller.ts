import express, { Request, Response } from "express";
import repos from "../../data/repos.json";
import { Repo } from "./repos.type";

// Singular / plural name to make consistent
// Refactor into route with separate controller file

const repoControllers = express.Router();

repoControllers.get("/", (_: Request, res: Response) => {
  res.status(200).json(repos);
});

repoControllers.get("/:id", (req: Request, res: Response) => {
  const repo: Repo = repos.find((repo) => repo.id === req.params.id) as Repo;
  res.status(200).json(repo);
});

export default repoControllers;
