import { app } from "./app.js";
const { PORT } = process.env

const port = PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
