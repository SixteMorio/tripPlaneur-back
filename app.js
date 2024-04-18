import express from "express";
import cors from "cors";
import "dotenv/config";
import v1Router from "./routes/v1.js";
const { PORT } = process.env

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/v1", v1Router);

const port = PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
