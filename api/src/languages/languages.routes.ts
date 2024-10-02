import express from "express";
import { getLanguages, addLanguage } from "./languages.controller";

const languageRouter = express.Router();

languageRouter.get("/", getLanguages);
languageRouter.post("/", addLanguage);

export default languageRouter;
