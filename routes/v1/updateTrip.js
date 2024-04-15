import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  const prompt = await prisma.prompt.update({
    where: {
      id: Number(id),
    },
    data: {
      content,
    },
  });

  if (!prompt) {
    return res.status(404).json({ message: 'Prompt not found' });
  }

  res.json(prompt);
});

export default router;