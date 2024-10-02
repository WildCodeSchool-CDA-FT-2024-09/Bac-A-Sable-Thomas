import express from "express";
import { getStatuses, addStatus } from "./statuses.controller";

const statusRouter = express.Router();

statusRouter.get("/", getStatuses);
statusRouter.post("/", addStatus);

export default statusRouter;
