import express from "express";

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { content, resIa } = req.body;
  const apiKey = 'iZNLEK4woJQqj5Rer3W5oI9NGuMcs4Mk';
  const prompt = `Tu es un spécialiste d'agence de voyage, je veux que tu me fasses le meilleur itinéraire touristique  court mais précis de mon voyage, que je vais te donner, en me donnant en clé json : (num) le numero de l'etape, (name) le nom du lieu, (km) nombre de kilometre entre chaque étape, (desc) une description rapide du lieu
  
  mon voyage: 3 jours en vélo dans la région PACA`;

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
