import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authMiddleware } from "../auth.js";
import { query } from "../database.js";
import sqlstring from "sqlstring";
const { escape } = sqlstring;

export const router = express.Router();

router.use(authMiddleware);
router.get(
  "/packages",
  authMiddleware,
  expressAsyncHandler(async (_, res) => {
    const results = await query("SELECT * from package");
    console.log("GET packages : ", JSON.stringify(results));
    await new Promise<void>((res) =>
      setTimeout(() => res(), Math.random() * 3000),
    );
    res.status(200).send(results);
  }),
);

router.delete(
  "/packages/:id",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).send();
    }
    await query(`DELETE FROM package WHERE idPackage = ${id}`);
    res.status(200).send({ status: "ok" });
  }),
);

router.post(
  "/packages",
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const packageToStore = req.body;
    const { packageNumber, articleReference, description } = packageToStore;

    const queryTo = `INSERT INTO package (packageNumber, articleReference, description) VALUES (${escape(
      packageNumber,
    )},${escape(articleReference)},${escape(description)})`;
    console.log(queryTo);
    await query(queryTo);
    const { idPackage } = (
      await query<any[]>("SELECT LAST_INSERT_ID() as idPackage")
    )[0];
    console.log(idPackage);
    res.status(200).send({ ...packageToStore, idPackage });
  }),
);

export default { router };
