// /pages/api/generate.js
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idea, email } = req.body;

  const prompt = `Du är en AI-baserad startupcoach. Kunden skrev: "${idea}".
Generera följande:
1. Affärsidé
2. Företagsnamn
3. Tagline
4. Målgrupp
5. Produktbeskrivning
6. FAQ (3 frågor)
7. Call-to-action
8. E-postämnesrad
9. 3 Facebook-annonser (hook + värde + CTA)
10. En kort videobeskrivning
11. Text till pitchdeck
12. Förslag på produkt att sälja + dropshippingmodell
Svar som JSON. Inkludera alla fält exakt.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    });

    const output = completion.choices[0].message.content;
    console.log("GPT Output:", output);

    // Kontrollera att output innehåller JSON-start
    if (!output.trim().startsWith("{")) {
      throw new Error("GPT svarade inte med giltig JSON. Svar:\n" + output);
    }

    const parsed = JSON.parse(output);

    // Skicka resultatet till klienten
    res.status(200).json(parsed);

    // Skicka också som e-post till användaren via Brevo (om e-post finns)
    if (email) {
      await fetch(`${process.env.BREVO_FUNCTION_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject: parsed["E-postämnesrad"] || "Ditt AI-genererade affärspaket",
          content: Object.entries(parsed).map(([key, val]) => `<h3>${key}</h3><p>${val}</p>`).join("")
        })
      });
    }

  } catch (error) {
    console.error("GPT error:", error.message || error);
    res.status(500).json({ error: "Kunde inte generera affärspaket." });
  }
}
