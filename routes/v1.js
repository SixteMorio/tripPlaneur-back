import express from "express";

import history from "./v1/history.js";

const router = express.Router();

router.use("/history", history);

export default router;
