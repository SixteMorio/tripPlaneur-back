import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get('/trips/histories', async (req, res, next) => {
  const history = await prisma.prompt.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(history);
});

export default router;