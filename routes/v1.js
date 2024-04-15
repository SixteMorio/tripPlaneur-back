import express from "express";

import history from "./v1/history.js";
import addHistory from "./v1/addHistory.js";

const router = express.Router();

router.use("/history", history);
router.use("addHistory", addHistory)

export default router;
