// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8d3879001@smtp-brevo.com", // Brevo SMTP-login
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

    const safe = (key) => data[key] || "undefined";

    const renderFAQ = () => {
      if (Array.isArray(data["6. FAQ"])) {
        return data["6. FAQ"]
          .map((item) => {
            if (typeof item === "string") return `<li>${item}</li>`;
            if (item.Fråga && item.Svar)
              return `<li><strong>${item.Fråga}</strong>: ${item.Svar}</li>`;
            if (item.Q && item.A)
              return `<li><strong>${item.Q}</strong>: ${item.A}</li>`;
            return "";
          })
          .join("");
      }
      return "<li>Inga frågor genererade.</li>";
    };

    const renderAds = () => {
      const ads = data["9. Facebook-annonser"];
      if (Array.isArray(ads)) {
        return ads
          .map(
            (ad) =>
              `<li><strong>${ad.hook || ad.Hook}</strong>: ${
                ad.value || ad.Värde
              } <em>${ad.CTA || ad.Cta || ad.cta}</em></li>`
          )
          .join("");
      }
      if (typeof ads === "object") {
        return Object.values(ads)
          .map(
            (ad) =>
              `<li><strong>${ad.hook || ad.Hook}</strong>: ${
                ad.value || ad.Värde
              } <em>${ad.CTA || ad.Cta || ad.cta}</em></li>`
          )
          .join("");
      }
      return "<li>Inga annonser genererade.</li>";
    };

    const htmlContent = `
      <h1>${safe("2. Företagsnamn")} – ${safe("3. Tagline")}</h1>
      <p><strong>Affärsidé:</strong> ${safe("1. Affärsidé")}</p>
      <p><strong>Målgrupp:</strong> ${safe("4. Målgrupp")}</p>
      <p><strong>Produktbeskrivning:</strong> ${safe("5. Produktbeskrivning")}</p>
      <p><strong>FAQ:</strong><ul>${renderFAQ()}</ul></p>
      <p><strong>Call-to-action:</strong> ${safe("7. Call-to-action")}</p>
      <p><strong>E-postämnesrad:</strong> ${safe("8. E-postämnesrad")}</p>
      <p><strong>Facebook-annonser:</strong><ul>${renderAds()}</ul></p>
      <p><strong>Videoidé:</strong> ${safe("10. En kort videobeskrivning")}</p>
      <p><strong>Pitchdeck:</strong> ${safe("11. Text till pitchdeck")}</p>
      <p><strong>Produktförslag:</strong> ${safe("12. Förslag på produkt att sälja + dropshippingmodell")}</p>
    `;

    if (email) {
      await transporter.sendMail({
        from: 'Startpilot <info@startpilot.org>',
        to: email,
        subject: `🚀 Din AI-startupidé: ${safe("2. Företagsnamn")}`,
        html: htmlContent
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Kunde inte generera affärspaket." });
  }
}
