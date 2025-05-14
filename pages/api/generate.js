export default async function handler(req, res) {
  const { name, interest, audience, experience } = req.body;

  const idea = `Skapa en AI-tjänst för ${interest} riktad till ${audience}`;
  const product = `En digital produkt som hjälper med ${interest} för ${audience}`;
  const pitch = `${name} bygger en lösning som kombinerar ${experience} med smart teknologi`;
  const ads = `1. Lär dig ${interest} med AI\n2. Perfekt för ${audience}\n3. Starta på 24h`;

  res.status(200).json({ idea, product, pitch, ads });
}
