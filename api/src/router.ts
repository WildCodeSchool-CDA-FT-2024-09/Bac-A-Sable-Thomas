// Main router definition
import express from "express";
import repoRouter from "./repos/repos.routes";
import statusRouter from "./statuses/statuses.routes";
import languageRouter from "./languages/languages.routes";
import commentRouter from "./comments/comments.routes";

const router = express.Router();

router.use("/repos", repoRouter);
router.use("/statuses", statusRouter);
router.use("/languages", languageRouter);
router.use("/comments", commentRouter);

export default router;
