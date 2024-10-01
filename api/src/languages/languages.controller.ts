import { Request, Response } from "express";
import { Language } from "./languages.entity";

export const getLanguages = async (_req: Request, res: Response) => {
  try {
    const languages = await Language.find({
      relations: {
        repos: true,
      },
    });
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addLanguage = async (req: Request, res: Response) => {
  const newLanguage: Language = req.body;
  try {
    const language = Language.create(newLanguage);
    await Language.insert(language);
    res.status(201).json(language);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
