// Main router definition
import express from "express";
import repoRouter from "./repos/repos.routes";
import statusRouter from "./statuses/statuses.routes";

const router = express.Router();

router.use("/repos", repoRouter);
router.use("/statuses", statusRouter);

export default router;
