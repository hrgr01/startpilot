// /pages/api/product-feed.js
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const prompt = `Du är en AI som varje vecka genererar 3 nya produktidéer som användare kan sälja via dropshipping. För varje produkt, inkludera:

1. Produktnamn
2. Kort beskrivning
3. Målgrupp
4. Säljfördelar
5. Rekommenderad annons-hook

Returnera som JSON-array.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const ideas = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ products: ideas });
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ error: "Kunde inte generera produktfeed." });
  }
}
