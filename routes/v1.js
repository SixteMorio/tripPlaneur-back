import express from "express";

import history from "./v1/history.js";
import addTripHistory from "./v1/addTripHistory.js";

const router = express.Router();

router.use("/history", history);
router.use("/addTripHistory", addTripHistory)

export default router;
