import fs from "fs";
import express from "express";
import cors from "cors";
import "dotenv/config";
import v1Router from "./routes/v1.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

app.use("/v1", v1Router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 7001;

// server.listen instead of app.listen
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
