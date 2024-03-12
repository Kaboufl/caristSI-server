import express from "express";
import { router as packagesRouter } from "./package-routes.js";
import { router as loginRouter } from "./login-routes.js";
import { loggerMiddleware } from "../logger.js";
export const router = express.Router();
router.use(loggerMiddleware);
router.use(loginRouter, packagesRouter);

export default { router };
