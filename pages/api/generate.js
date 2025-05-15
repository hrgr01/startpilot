export default async function handler(req, res) {
  const { prompt } = req.body;

  // Enkel mock – här kan du koppla till riktig GPT senare
  const idea = prompt.toLowerCase();
  const output = `Din idé om "${idea}" kan bli en AI-tjänst som hjälper människor att lösa detta problem effektivt. Här är en möjlig pitch: En smart AI-lösning som erbjuder ${idea} på ett automatiserat, skalbart och lönsamt sätt.`;

  res.status(200).json({ result: output });
}
