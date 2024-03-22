import crypto from "crypto";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../auth.js";
import { query } from "../database.js";

// MD5 hash generator
const md5 = (contents: string) =>
  crypto.createHash("md5").update(contents).digest("hex");
export const router = express.Router();

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { login, password } = req.body;
    console.log("login", login, password);
    const results = await query<any[]>(
      `SELECT * FROM carist where login = '${login}' AND password = '${md5(
        password,
      )}'`,
    );
    if (results.length > 0) {
      res.status(200);
      const result = results[0];
      const { idCarist, nomCarist, prenomCarist, loginCarist } = result;
      const token = generateToken(idCarist, nomCarist, prenomCarist);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.send({
        idCarist,
        nomCarist,
        prenomCarist,
        loginCarist,
      });
    } else {
      res.status(401);
      res.send({ message: "Invalid login or password" });
    }
  }),
);

export default { router };
