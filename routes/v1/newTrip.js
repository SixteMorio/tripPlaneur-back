import express from "express";

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { content, resIa } = req.body;
  const apiKey = 'iZNLEK4woJQqj5Rer3W5oI9NGuMcs4Mk';
  const prompt = `Tu es un spécialiste d'agence de voyage, je veux que tu me fasses un itinéraire de ma destionation, que je vais te donner, en me donnant en clé json (name) le nom du lieu,`;

  try {

    const mistralResponse = await fetch('https://docs.mistral.ai/api/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ prompt, content })
    });

    const mistralData = await mistralResponse.json();
    resIa = mistralData;

    res.json(mistralData);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de l'appel à l'API externe (Mistral)." });
  }
});

export default router;
