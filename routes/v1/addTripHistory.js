import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post('/trip', async (req, res, next) => {
  const { content, resIa } = req.body;

  const newTrip = await prisma.prompt.create({
    data: {
      content,
      resIa,
      createdAt: new Date(),
    },
  });

  res.json(newTrip);
});

export default router;