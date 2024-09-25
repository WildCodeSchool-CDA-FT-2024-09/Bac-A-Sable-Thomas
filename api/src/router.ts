// Main router definition
import express, { Request, Response } from "express";
import repoControllers from "./repos/repos.controller";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello World");
});
router.use("/repos", repoControllers);

export default router;
