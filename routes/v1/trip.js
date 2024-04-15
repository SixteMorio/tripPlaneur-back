import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const prompt = await prisma.prompt.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!prompt) {
    return res.status(404).json({ message: 'Prompt not found' });
  }

  res.json({ resIa: prompt.resIa });
});

export default router;