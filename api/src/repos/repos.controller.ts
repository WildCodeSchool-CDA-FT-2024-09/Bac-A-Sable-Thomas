import { Request, Response } from "express";
import repos from "../../data/repos.json";
import { Repo } from "./repos.types";

export const getRepos = (req: Request, res: Response) => {
  // Query params
  if (req.query !== undefined) {
    if (req.query.order) {
      const orderBy = req.query.order;
      // testing order by "name" or "id"
      repos.sort((a, b) => {
        if (orderBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (orderBy === "id") {
          return a.id.localeCompare(b.id);
        }
        return 0;
      });
      res.status(200).json(repos);
    }
  }
  // Default
  res.status(200).json(repos);
};

export const getRepo = (req: Request, res: Response) => {
  const repo: Repo = repos.find((repo) => repo.id === req.params.id) as Repo;
  if (!repo) {
    res.status(404).json({ message: "Repo not found" });
  }
  res.status(200).json(repo);
};

export const addRepo = (req: Request, res: Response) => {
  const newRepo: Repo = req.body;
  repos.push(newRepo);
  res.status(201).json(newRepo);
};

export const deleteRepo = (req: Request, res: Response) => {
  const repoIndex = repos.findIndex((repo) => repo.id === req.params.id);
  if (repoIndex === -1) {
    res.status(404).json({ message: "Repo not found" });
  }
  repos.splice(repoIndex, 1);
  res.status(204).send();
};

export const updateRepo = (req: Request, res: Response) => {
  const repoIndex = repos.findIndex((repo) => repo.id === req.params.id);
  if (repoIndex === -1) {
    res.status(404).json({ message: "Repo not found" });
  }
  const updatedRepo: Repo = req.body;
  repos[repoIndex] = updatedRepo;
  res.status(200).json(updatedRepo);
};
