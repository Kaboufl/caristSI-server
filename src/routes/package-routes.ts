import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authMiddleware } from "../auth.js";
import { query } from "../database.js";

export const router = express.Router();

router.use(authMiddleware);
router.get(
  "/packages",
  authMiddleware,
  expressAsyncHandler(async (_, res) => {
    const results = await query("SELECT * from package");
    res.status(200).send(results);
  }),
);

export default { router };
