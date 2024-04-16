import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body;
    const { API_KEY, MISTRAL_API_URL, MODEL_NAME } = process.env;

    if (!content) {
      throw new Error("Le contenu de la requête est vide.");
    }

    if (!API_KEY || !MISTRAL_API_URL || !MODEL_NAME) {
      throw new Error("Les variables d'environnement ne sont pas définies.");
    }

    const userPrompt = content;
    const prePrompt = `Tu es un spécialiste d'agence de voyage, je veux que tu me fasses le meilleur itinéraire touristique court mais précis de mon voyage, que je vais te donner, en plusieurs étapes en me donnant une liste en clé json : (num) le numero de l'etape, (name) le nom du lieu, (km) nombre de kilometre entre chaque étape, (desc) une description rapide du lieu.Je ne veux pas de texte autour je ne veux que du JSON.Les dernières lignes doivent être du JSON

    mon voyage: `;

    const prompt = `${prePrompt}\n${userPrompt}`;
    console.log({
      "model": MODEL_NAME,
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ],
    })
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
      throw new Error(`Erreur lors de l'appel à l'API externe (Mistral) : ${mistralResponse}`);
    }

    const mistralData = await mistralResponse.json();

    console.log(JSON.stringify(mistralData));

    // Sauvegarde
    const newPrompt = await prisma.prompt.create({
      data: {
        content: userPrompt,
        resIa: JSON.parse(mistralData.choices[0].message.content),
        createdAt: new Date(),
      },
    });

    res.json(newPrompt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Une erreur s'est produite lors du traitement de la requête." });
  }
});

export default router;
