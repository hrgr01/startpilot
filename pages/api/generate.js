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

function formatFAQ(faqArray) {
  return faqArray.map(item => {
    if (typeof item === "string") return `- ${item}`;
    if (typeof item === "object" && item.Q && item.A)
      return `- <b>Fråga:</b> ${item.Q}<br><b>Svar:</b> ${item.A}`;
    return "- [Ogiltigt FAQ-format]";
  }).join("<br>");
}

function formatAds(ads) {
  return ads.map(ad => {
    if (typeof ad === "object" && ad.hook && ad.value && ad.CTA)
      return `- <b>${ad.hook}</b><br>${ad.value}<br><i>${ad.CTA}</i>`;
    return "- [Ogiltig annons]";
  }).join("<br>");
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idea, email } = req.body;

  const prompt = `Du är en AI-baserad startupcoach. Kunden skrev: "${idea}".
Generera följande som JSON med tydliga nycklar:
1. Affärsidé
2. Företagsnamn
3. Tagline
4. Målgrupp
5. Produktbeskrivning
6. FAQ (3 frågor, i formatet [{"Q":"fråga","A":"svar"}])
7. Call-to-action
8. E-postämnesrad
9. 3 Facebook-annonser (som objekt med hook, value, CTA)
10. En kort videobeskrivning
11. Text till pitchdeck
12. Förslag på produkt att sälja + dropshippingmodell`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4"
    });

    const raw = chatCompletion.choices[0].message.content;
    const result = JSON.parse(raw);

    const body = `
    <h2>🚀 Din AI-startupidé: ${result["2. Företagsnamn"]}</h2>
    <h3>${result["3. Tagline"]}</h3>
    <b>Affärsidé:</b> ${result["1. Affärsidé"]}<br><br>
    <b>Målgrupp:</b> ${result["4. Målgrupp"]}<br><br>
    <b>Produktbeskrivning:</b> ${result["5. Produktbeskrivning"]}<br><br>
    <b>FAQ:</b><br>${formatFAQ(result["6. FAQ"] || [])}<br><br>
    <b>Call-to-action:</b> ${result["7. Call-to-action"]}<br><br>
    <b>E-postämnesrad:</b> ${result["8. E-postämnesrad"]}<br><br>
    <b>Facebook-annonser:</b><br>${formatAds(result["9. Facebook-annonser"] || [])}<br><br>
    <b>Videoidé:</b> ${result["10. Kort videobeskrivning"] || "– saknas –"}<br><br>
    <b>Pitchdeck:</b> ${result["11. Text till pitchdeck"] || "–"}<br><br>
    <b>Produktförslag:</b> ${result["12. Förslag på produkt att sälja + dropshippingmodell"] || "–"}<br><br>
    <hr>
    <small>Tack för att du använde Startpilot! Vi tror på din idé – nu är det dags att ta nästa steg.</small>
    `;

    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: `🚀 Din AI-startupidé: ${result["2. Företagsnamn"]}`,
      html: body
    });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ error: "Något gick fel med AI-genereringen eller e-posten." });
  }
}
