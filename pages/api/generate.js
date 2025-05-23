// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

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
    const parsed = JSON.parse(output);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_SMTP_KEY
      }
    });

    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: `🚀 Din AI-startupidé: ${parsed["Företagsnamn"]}`,
      text: `Här är ditt AI-genererade paket:

Företagsnamn: ${parsed["Företagsnamn"]}
Tagline: ${parsed["Tagline"]}
Affärsidé: ${parsed["Affärsidé"]}
Målgrupp: ${parsed["Målgrupp"]}

Produktbeskrivning: ${parsed["Produktbeskrivning"]}
FAQ: ${parsed["FAQ (3 frågor)"]}
Call-to-action: ${parsed["Call-to-action"]}
E-postämne: ${parsed["E-postämnesrad"]}
Facebook-annonser: ${parsed["3 Facebook-annonser (hook + värde + CTA)"]}
Videoidé: ${parsed["En kort videobeskrivning"]}
Pitchdeck-text: ${parsed["Text till pitchdeck"]}
Produktförslag: ${parsed["Förslag på produkt att sälja + dropshippingmodell"]}`
    });

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Fel i API:", error);
    res.status(500).json({ error: "Kunde inte generera affärspaket." });
  }
}
