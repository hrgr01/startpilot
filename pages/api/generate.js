// pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "info@startpilot.org",
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
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
6. FAQ (3 frågor och svar)
7. Call-to-action
8. E-postämnesrad
9. 3 Facebook-annonser (hook + värde + CTA)
10. En kort videobeskrivning
11. Text till pitchdeck
12. Förslag på produkt att sälja + dropshippingmodell
Svar som JSON. Inkludera alla fält exakt.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.8,
    });

    const resultText = completion.choices?.[0]?.message?.content;
    const data = JSON.parse(resultText);

    const safe = (key) => data?.[key] || "– saknas –";

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color:#111;">🚀 Din AI-startupidé: <strong>${safe("2. Företagsnamn")}</strong></h1>
        <p><strong>Tagline:</strong> ${safe("3. Tagline")}</p>
        <p><strong>Affärsidé:</strong> ${safe("1. Affärsidé")}</p>
        <p><strong>Målgrupp:</strong> ${safe("4. Målgrupp")}</p>
        <p><strong>Produktbeskrivning:</strong> ${safe("5. Produktbeskrivning")}</p>

        <h3>FAQ:</h3>
        <ul>
          ${(Array.isArray(data["6. FAQ"]) ? data["6. FAQ"] : []).map((item) => `<li>${item}</li>`).join("") || "<li>– saknas –</li>"}
        </ul>

        <p><strong>Call-to-action:</strong> ${safe("7. Call-to-action")}</p>
        <p><strong>E-postämnesrad:</strong> ${safe("8. E-postämnesrad")}</p>

        <h3>Facebook-annonser:</h3>
        <ul>
          ${(Array.isArray(data["9. Facebook-annonser"]) ? data["9. Facebook-annonser"] : []).map((ad) => `
            <li><strong>${ad?.hook || "–"}</strong><br>
            ${ad?.värde || "–"}<br>
            <em>${ad?.CTA || "–"}</em></li>
          `).join("") || "<li>– saknas –</li>"}
        </ul>

        <p><strong>Videoidé:</strong> ${safe("10. En kort videobeskrivning")}</p>
        <p><strong>Pitchdeck:</strong> ${safe("11. Text till pitchdeck")}</p>
        <p><strong>Produktförslag:</strong> ${safe("12. Förslag på produkt att sälja + dropshippingmodell")}</p>

        <hr>
        <p style="font-size:0.9em;color:#666;">Tack för att du använder Startpilot. Vi tror på dig – och din idé.</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"Startpilot" <info@startpilot.org>',
      to: email,
      subject: `🚀 Din AI-startupidé: ${safe("2. Företagsnamn")}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    return res.status(500).json({ error: "Ett fel uppstod vid generering eller utskick." });
  }
}
