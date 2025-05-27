import { OpenAI } from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8d3879001@smtp-brevo.com",
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
      temperature: 0.7
    });

    let output = completion.choices[0].message.content;

    let data;
    try {
      data = JSON.parse(output);
    } catch (err) {
      // fallback om GPT inte svarade i JSON
      output = output.replace(/“|”/g, '"');
      output = output.replace(/(\w+):/g, '"$1":');
      data = JSON.parse(`{${output.split('\n').filter(l => l.includes(':')).join(',')}}`);
    }

    const get = (key) => data[key] || "undefined";

    const htmlContent = `
      <h1>${get("2. Företagsnamn")} – ${get("3. Tagline")}</h1>
      <p><strong>Affärsidé:</strong> ${get("1. Affärsidé")}</p>
      <p><strong>Målgrupp:</strong> ${get("4. Målgrupp")}</p>
      <p><strong>Produktbeskrivning:</strong> ${get("5. Produktbeskrivning")}</p>
      <p><strong>FAQ:</strong><ul>${
        (Array.isArray(data["6. FAQ"]) 
          ? data["6. FAQ"].map(q => `<li><strong>${q.Fråga || q.Q}</strong>: ${q.Svar || q.A}</li>`) 
          : [])
          .join("")
      }</ul></p>
      <p><strong>Call-to-action:</strong> ${get("7. Call-to-action")}</p>
      <p><strong>E-postämnesrad:</strong> ${get("8. E-postämnesrad")}</p>
      <p><strong>Facebook-annonser:</strong><ul>${
        (Array.isArray(data["9. Facebook-annonser"]) 
          ? data["9. Facebook-annonser"].map(ad => 
              `<li><strong>${ad.hook || ad.Hook}</strong> – ${ad.value || ad.Värde || ad.värde} (${ad.CTA})</li>`)
          : [])
          .join("")
      }</ul></p>
      <p><strong>Videoidé:</strong> ${get("10. En kort videobeskrivning")}</p>
      <p><strong>Pitchdeck:</strong> ${get("11. Text till pitchdeck")}</p>
      <p><strong>Produktförslag:</strong> ${get("12. Förslag på produkt att sälja + dropshippingmodell")}</p>
    `;

    if (email) {
      await transporter.sendMail({
        from: 'Startpilot <info@startpilot.org>',
        to: email,
        subject: `🚀 Din AI-startupidé: ${get("2. Företagsnamn")}`,
        html: htmlContent
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Kunde inte generera affärspaket." });
  }
}
