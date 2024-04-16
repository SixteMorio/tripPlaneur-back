import express from "express";

import history from "./v1/history.js";
import trip from "./v1/trip.js";
import updateTrip from "./v1/updateTrip.js";
import newTrip from "./v1/newTrip.js";


const router = express.Router();

router.use("/history", history);
router.use("/trip", trip);
router.use("/updateTrip", updateTrip);
router.use("/newTrip", newTrip);

export default router;
