import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { content, resIa } = req.body;

  const newPrompt = await prisma.prompt.create({
    data: {
      content,
      resIa,
      createdAt: new Date(),
    },
  });

  res.json(newPrompt);
});

export default router;