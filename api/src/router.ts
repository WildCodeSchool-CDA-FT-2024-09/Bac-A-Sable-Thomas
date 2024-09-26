// Main router definition
import express from "express";
import repoRouter from "./repos/repos.routes";

const router = express.Router();

router.use("/repos", repoRouter);

export default router;
