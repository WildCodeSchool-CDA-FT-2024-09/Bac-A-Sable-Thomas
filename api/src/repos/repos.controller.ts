import { Request, Response } from "express";
import { Repo } from "./repos.entity";
// import { Status } from "../statuses/statuses.entity";
import { validate } from "class-validator";
import { QueryFailedError } from "typeorm";

export const getRepos = async (req: Request, res: Response) => {
  // Query params
  if (req.query !== undefined) {
    if (req.query.order) {
      const orderBy = req.query.order as string;
      try {
        const repos = await Repo.find({
          order: { [orderBy]: "ASC" },
          relations: { status: true },
        });
        res.status(200).json(repos);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  try {
    const repos = await Repo.find({
      relations: { status: true },
    });
    res.status(200).json(repos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRepo = async (req: Request, res: Response) => {
  const repo = await Repo.findOne({ where: { id: req.params.id } });
  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
};

export const addRepo = async (req: Request, res: Response) => {
  const newRepo: Repo = req.body;
  try {
    const repo = Repo.create(newRepo);
    // Validate entity before saving
    const errors = await validate(repo);
    if (errors.length > 0) {
      res.status(400).json({ message: "Validation errors", errors });
      return;
    }
    // Attempt to save entity - have to use explicit insert as .save() in TypeORM does an upsert.
    // This is somewhat particular to the demo case with a non-autoincrementing primary key.
    await Repo.insert(repo);
    res.status(201).json(repo);
  } catch (err) {
    if (err instanceof QueryFailedError) {
      // Db constraint errors will show here
      res
        .status(400)
        .json({ message: "Database query failed", details: err.message });
    } else {
      // Generic error handler
      res
        .status(500)
        .json({ message: "Internal server error", details: err.message });
    }
  }
};

export const deleteRepo = async (req: Request, res: Response) => {
  const result = await Repo.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ message: "Repo not found" });
  } else {
    res.status(204).send();
  }
};

export const updateRepo = async (req: Request, res: Response) => {
  const repo = await Repo.findOne({ where: { id: req.params.id } });

  if (repo) {
    Repo.merge(repo, req.body);
    const updatedRepo = await repo.save();
    res.status(200).json(updatedRepo);
  } else {
    res.status(404).json({ message: "Repo not found" });
  }
};
