import express from "express";

import history from "./v1/history.js";
import addTripHistory from "./v1/addTripHistory.js";
import trip from "./v1/trip.js";


const router = express.Router();

router.use("/history", history);
router.use("/addTripHistory", addTripHistory);
router.use("/trip", trip);

export default router;
