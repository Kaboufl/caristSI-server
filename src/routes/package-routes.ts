import express from "express";
import expressAsyncHandler from "express-async-handler";
import { authMiddleware } from "../auth.js";
import { connection, query } from "../database.js";
import { ResultSetHeader } from "mysql2";

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
        console.error("requete invalide")
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
        console.error(e)
        res.status(500).json({
          status: "error",
          message: "Internal server error",
        })
      }
      return
    }
  }
))

router.delete("/package", async (req, res) => {

    const packageNumber = req.query.packageNumber;

    if (!packageNumber) {
      return res.status(400).json({
        status: "error",
        message: "Numéro de colis manquant",
      });
    }

    try {
      const [result] = await connection.promise().query<ResultSetHeader>(
        "DELETE FROM package WHERE packageNumber = ?",
        [packageNumber]
      )

      if (!result.affectedRows) {
        return res.status(404).json({
          status: "error",
          message: "Colis non trouvé",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Colis supprimé",
      });
    } catch (error) {
      console.error("Error deleting package", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error"
      })
    }
  }
);

// http://192.168.1.45:8080/package?packageNumber=453226997


// router.delete("/package", expressAsyncHandler(
//   async (req, res) => {
//     console.log("request body", req.body)
//     const { articleReference, packageNumber, description } = req.body

//     if (!packageNumber) {
//       res.status(400).json({
//         status: "error",
//         message: "Missing required information",
//       })
//       return
//     }
    
//     try {

//       const [result] = await connection.promise().query<ResultSetHeader>(
//         "DELETE FROM package WHERE packageNumber = ?",
//         [packageNumber]
//       )

//       if (!result.affectedRows) {
//         res.status(404)
//           .json({
//             status: "error",
//             message: "Package not found"
//           })
//       }
  
//       res.status(200).json({
//         status: "success",
//         message: "Package deleted",
//       })
//       console.log("Package deleted", result.affectedRows)

//     } catch (e) {
//       res.status(500).json({
//         status: "error",
//         message: "Internal server error",
//       })
//       console.error("Error deleting package")
//       return
//     }
//   }
// ))

export default { router };
