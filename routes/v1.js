import express from "express";

import trip from "./v1/trip.js";

const router = express.Router();

router.use("/trip", trip);

export default router;
