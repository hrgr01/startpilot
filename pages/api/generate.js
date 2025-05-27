// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8d3879001@smtp-brevo.com", // OBS: detta ska matcha din Brevo SMTP-login, ej "info@startpilot.org"
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
    } catch (err) {
      console.error("Kunde inte parsa JSON:", output);
      return res.status(500).json({ error: "Fel i GPT-4-svaret." });
    }

    const faqHTML = Array.isArray(data["6. FAQ"])
      ? data["6. FAQ"].map(f => {
          if (typeof f === "string") return `<li>${f}</li>`;
          return `<li><strong>${f.Fråga || f.Q}:</strong> ${f.Svar || f.A}</li>`;
        }).join("")
      : "";

    const adsHTML = Array.isArray(data["9. Facebook-annonser"])
      ? data["9. Facebook-annonser"].map(ad => {
          return `<li><strong>${ad.hook || ad.Hook}:</strong> ${ad.value || ad.Värde} <em>${ad.CTA}</em></li>`;
        }).join("")
      : "";

    const htmlContent = `
      <h1>${data["2. Företagsnamn"] || "Startup"} – ${data["3. Tagline"] || ""}</h1>
      <p><strong>Affärsidé:</strong> ${data["1. Affärsidé"]}</p>
      <p><strong>Målgrupp:</strong> ${data["4. Målgrupp"]}</p>
      <p><strong>Produktbeskrivning:</strong> ${data["5. Produktbeskrivning"]}</p>
      <p><strong>FAQ:</strong><ul>${faqHTML}</ul></p>
      <p><strong>Call-to-action:</strong> ${data["7. Call-to-action"]}</p>
      <p><strong>E-postämnesrad:</strong> ${data["8. E-postämnesrad"]}</p>
      <p><strong>Facebook-annonser:</strong><ul>${adsHTML}</ul></p>
      <p><strong>Videoidé:</strong> ${data["10. En kort videobeskrivning"]}</p>
      <p><strong>Pitchdeck:</strong> ${data["11. Text till pitchdeck"]}</p>
      <p><strong>Produktförslag:</strong> ${data["12. Förslag på produkt att sälja + dropshippingmodell"]}</p>
    `;

    if (email) {
      await transporter.sendMail({
        from: 'Startpilot <info@startpilot.org>',
        to: email,
        subject: `🚀 Din AI-startupidé: ${data["2. Företagsnamn"] || "Startpilot"}`,
        html: htmlContent
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Kunde inte generera eller skicka." });
  }
}
