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

    let data;
    try {
      data = JSON.parse(output);
    } catch {
      console.error("JSON parse-fel:", output);
      return res.status(500).json({ error: "Kunde inte tolka GPT-svar." });
    }

    const html = `
      <h2>${data["2. Företagsnamn"]} – ${data["3. Tagline"]}</h2>
      <p><strong>Affärsidé:</strong> ${data["1. Affärsidé"]}</p>
      <p><strong>Målgrupp:</strong> ${data["4. Målgrupp"]}</p>
      <p><strong>Produktbeskrivning:</strong> ${data["5. Produktbeskrivning"]}</p>
      <p><strong>FAQ:</strong><ul>${(data["6. FAQ"] || []).map(q => `<li>${q}</li>`).join('')}</ul></p>
      <p><strong>Call-to-action:</strong> ${data["7. Call-to-action"]}</p>
      <p><strong>E-postämnesrad:</strong> ${data["8. E-postämnesrad"]}</p>
      <p><strong>Facebook-annonser:</strong><ul>${(data["9. Facebook-annonser"] || []).map(ad => `<li>${ad.hook} – ${ad.värde} (${ad.CTA})</li>`).join('')}</ul></p>
      <p><strong>Videobeskrivning:</strong> ${data["10. En kort videobeskrivning"]}</p>
      <p><strong>Pitch:</strong> ${data["11. Text till pitchdeck"]}</p>
      <p><strong>Dropshipping-produkt:</strong> ${data["12. Förslag på produkt att sälja + dropshippingmodell"]}</p>
    `;

    if (email) {
      await transporter.sendMail({
        from: 'Startpilot <info@startpilot.org>',
        to: email,
        subject: data["8. E-postämnesrad"] || "Din AI-genererade affärsidé",
        html
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Något gick fel." });
  }
}
