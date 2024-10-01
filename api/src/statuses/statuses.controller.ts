import { Request, Response } from "express";
import { Status } from "./statuses.entity";

export const getStatuses = async (_req: Request, res: Response) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStatus = async (req: Request, res: Response) => {
  const newStatus: Status = req.body;
  try {
    const status = Status.create(newStatus);
    await Status.insert(status);
    res.status(201).json(status);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
