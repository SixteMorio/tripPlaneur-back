import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { content } = req.body;
  const { API_KEY, MISTRAL_API_URL, MODEL_NAME } = process.env;

  const userPrompt = content;
  const prevPrompt = `Tu es un spécialiste d'agence de voyage, je veux que tu me fasses le meilleur itinéraire touristique court mais précis de mon voyage, que je vais te donner, en plusieurs étapes en me donnant en clé json : (num) le numero de l'etape, (name) le nom du lieu, (km) nombre de kilometre entre chaque étape, (desc) une description rapide du lieu
  
  mon voyage: 3 jours en vélo dans la région PACA`;

  const prompt = `${prevPrompt}\n${userPrompt}`;

  try {
    const mistralResponse = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ prompt })
    });

    const mistralData = await mistralResponse.json();

    // Sauvegarde
    const newPrompt = await prisma.prompt.create({
      data: {
        content: userPrompt,
        resIa: mistralData,
        createdAt: new Date(),
      },
    });

    res.json(newPrompt);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de l'appel à l'API externe (Mistral)." });
  }
});

export default router;
