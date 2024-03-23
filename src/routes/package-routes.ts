import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authMiddleware } from "../auth.js";
import { connection, query } from "../database.js";

export const router = express.Router();

router.use(authMiddleware);
router.get(
  "/packages",
  authMiddleware,
  expressAsyncHandler(async (_, res) => {
    const results = await query("SELECT * from package");
    console.log("results", results)
    res.status(200).send(results);
  }),
);

router.post("/package", expressAsyncHandler(
  async (req, res) => {
    console.log("request body", req.body)
    const { articleReference, packageNumber, description } = req.body

    try {
      if (!articleReference || !packageNumber) {
        res.status(400).json({
          status: "error",
          message: "Missing required information",
        })
        return
      }

      await connection.promise().query(
        "INSERT INTO package (articleReference, packageNumber, description) VALUES (?, ?, ?)",
        [articleReference, packageNumber, description]
      )
  
      res.status(200).json({
        status: "success",
        message: "Package created",
      })
      return

    } catch (e: any) {
      if (e.code === 'ER_DUP_ENTRY') {
        res.status(400).json({
          status: "error",
          message: "Le numéro de colis existe déjà",
        })
      } else {
        res.status(500).json({
          status: "error",
          message: "Internal server error",
        })
      }
      return
    }
  }
))


router.delete("/package", expressAsyncHandler(
  async (req, res) => {
    console.log("request body", req.body)
    const { articleReference, packageNumber, description } = req.body

    if (!packageNumber) {
      res.status(400).json({
        status: "error",
        message: "Missing required information",
      })
      return
    }
    
    try {

      await connection.promise().query(
        "DELETE FROM package WHERE packageNumber = ?",
        [packageNumber]
      )
  
      res.status(200).json({
        status: "success",
        message: "Package deleted",
      })
      return

    } catch (e) {
      res.status(500).json({
        status: "error",
        message: "Package not found",
      })
      return
    }
  }
))

export default { router };
