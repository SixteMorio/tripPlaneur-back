import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = express.Router();

const processPrompt = async (content) => {
  const { API_KEY, MISTRAL_API_URL, MODEL_NAME, PROMPT } = process.env;

  if (!content || !API_KEY || !MISTRAL_API_URL || !MODEL_NAME) {
    throw new Error("The query parameters are invalid or the environment variables are not set.");
  }

  const userPrompt = content;
  const prePrompt = PROMPT;

  const prompt = `${prePrompt}\n${userPrompt}`;

  const mistralResponse = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      "model": MODEL_NAME,
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ],
    })
  });

  if (!mistralResponse.ok) {
    throw new Error(`Error when calling external API (Mistral): ${mistralResponse}`);
  }

  const mistralData = await mistralResponse.json();

  console.log(JSON.stringify(mistralData));

  // Sauvegarde du prompt
  return JSON.parse(mistralData.choices[0].message.content);
};

router.get('/', async (req, res, next) => {
  const history = await prisma.prompt.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });
  res.json(history);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const prompt = await prisma.prompt.findUnique({
    where: {
      id,
    },
  });

  if (!prompt) {
    return res.status(404).json({ message: 'Prompt not found' });
  }

  res.json({ resIa: prompt.resIa });
});

router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body;
    const newPrompt = await processPrompt(content);

    // Sauvegarde
    const savedPrompt = await prisma.prompt.create({
      data: {
        content: content,
        resIa: newPrompt,
        createdAt: new Date(),
      },
    });

    res.json(savedPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while processing the request." });
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const newPrompt = await processPrompt(content);

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id,
      },
      data: {
        content: content,
        resIa: newPrompt,
      },
    });

    res.json(updatedPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while processing the request." });
  }
});

export default router;