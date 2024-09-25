// Main router definition
import express, { Request, Response } from "express";
import repoRouter from "./repos/repos.routes";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});
router.use("/repos", repoRouter);

export default router;
