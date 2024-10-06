import { Request, Response } from "express";
import { Comment } from "./comments.entity";

export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find({
      relations: { repo: true },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { author, text, repoId } = req.body;
  try {
    const comment = new Comment();
    comment.author = author;
    comment.text = text;
    comment.repo = repoId;
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
