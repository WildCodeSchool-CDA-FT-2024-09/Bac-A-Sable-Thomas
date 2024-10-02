import { Request, Response, NextFunction } from "express";
import { Repo } from "./repos.entity";
import { validate } from "class-validator";
import { In } from "typeorm";
import { Status } from "../statuses/statuses.entity";
import { Language } from "../languages/languages.entity";

export const getRepos = async (req: Request, res: Response) => {
  // Query params
  if (req.query !== undefined) {
    if (req.query.order) {
      const orderBy = req.query.order as string;
      try {
        const repos = await Repo.find({
          order: { [orderBy]: "ASC" },
          relations: { status: true, languages: true },
        });
        res.status(200).json(repos);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  try {
    const repos = await Repo.find({
      relations: { status: true, languages: true },
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

export const addRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newRepo = req.body;
  try {
    // Modify for explicit values assignement
    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const newStatus = await Status.findOneOrFail({
      where: { id: newRepo.isPrivate },
    });
    repo.status = newStatus;

    const newLanguages = await Language.find({
      where: { id: In(newRepo.languages) },
    });

    repo.languages = newLanguages;

    // Validate entity before saving
    const errors = await validate(repo);
    if (errors.length > 0) {
      res.status(400).json({ message: "Validation errors", errors });
      return;
    }

    const savedRepo = await repo.save();
    res.status(201).json(savedRepo);
  } catch (err) {
    next(err);
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
