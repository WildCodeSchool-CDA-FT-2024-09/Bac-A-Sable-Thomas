import { Request, Response } from "express";
import repos from "../../data/repos.json";
import { Repo } from "./repos.types";

export const getRepos = (_: Request, res: Response) => {
  res.status(200).json(repos);
};

export const getRepo = (req: Request, res: Response) => {
  const repo: Repo = repos.find((repo) => repo.id === req.params.id) as Repo;
  if (!repo) {
    res.status(404).json({ message: "Repo not found" });
  }
  res.status(200).json(repo);
};
