import express from "express";

import createError from "http-errors";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();



export default router;