import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const repoSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  isPrivate: Joi.number().min(1).max(2).required(),
});

export const validateRepo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = repoSchema.validate(req.body);
  if (error == null) {
    next();
  } else {
    res.status(422).json({ error });
  }
};
