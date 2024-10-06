import express from "express";
import { getComments, addComment } from "./comments.controller";

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.post("/", addComment);

export default commentRouter;
