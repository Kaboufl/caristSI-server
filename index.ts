import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send({
    response: "Hello World",
  });
});
const serverPort = 3000;
app.listen(serverPort, () =>
  console.log(`Server started, listening on localhost:${serverPort}`),
);
