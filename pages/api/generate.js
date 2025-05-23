// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "info@startpilot.org",
    pass: process.env.BREVO_SMTP_PASSWORD
  }
});

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
    const data = JSON.parse(output);

    const htmlContent = `
      <h1>${data["Företagsnamn"]} – ${data["Tagline"]}</h1>
      <p><strong>Affärsidé:</strong> ${data["Affärsidé"]}</p>
      <p><strong>Målgrupp:</strong> ${data["Målgrupp"]}</p>
      <p><strong>Produktbeskrivning:</strong> ${data["Produktbeskrivning"]}</p>
      <p><strong>FAQ:</strong> ${data["FAQ (3 frågor)"]}</p>
      <p><strong>Call-to-action:</strong> ${data["Call-to-action"]}</p>
      <p><strong>E-postämnesrad:</strong> ${data["E-postämnesrad"]}</p>
      <p><strong>Facebook-annonser:</strong> ${data["3 Facebook-annonser (hook + värde + CTA)"]}</p>
      <p><strong>Videoidé:</strong> ${data["En kort videobeskrivning"]}</p>
      <p><strong>Pitchdeck:</strong> ${data["Text till pitchdeck"]}</p>
      <p><strong>Produktförslag:</strong> ${data["Förslag på produkt att sälja + dropshippingmodell"]}</p>
    `;

    await transporter.sendMail({
      from: 'Startpilot <info@startpilot.org>',
      to: email,
      subject: `🚀 Din AI-startupidé: ${data["Företagsnamn"]}`,
      html: htmlContent
    });

    res.status(200).json({ ...data, success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Kunde inte generera affärspaket." });
  }
}
