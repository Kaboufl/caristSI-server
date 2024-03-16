import express from "express";
import { query } from "./database.js";
import { router } from "./routes/routes.js";
import dotenv from "dotenv";

try {
  const result = await query<any[]>("SELECT 1");
  console.log(`Connected to database : ${result[0][1]}`);
} catch (err) {
  throw new Error("Unable to reach database. Cause : " + err);
}

try {
  const app = express();
  dotenv.config();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.status(200).send({
      response: "Hello World",
    });
  });
  app.use(router);
  const serverPort = 8080;
  const bindingAddress = "10.86.131.70";
  // app.listen(serverPort, bindingAddress, () =>
  app.listen(serverPort, () =>
    console.log(`Server started, listening on ${bindingAddress}:${serverPort}`),
  );
} catch (err) {
  throw new Error("Error while bootstrapping Express server : " + err);
}
