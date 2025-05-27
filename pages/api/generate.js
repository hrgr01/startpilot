// /pages/api/generate.js
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

  const prompt = `Du är en AI-startupcoach. Kunden skrev: "${idea}".
Generera följande som giltig JSON:
{
  "businessIdea": string,
  "companyName": string,
  "tagline": string,
  "targetAudience": string,
  "productDescription": string,
  "faq": [{"question": string, "answer": string}],
  "callToAction": string,
  "emailSubject": string,
  "facebookAds": [{"hook": string, "value": string, "CTA": string}],
  "videoIdea": string,
  "pitch": string,
  "productSuggestion": string
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Du svarar ENDAST med JSON" },
        { role: "user", content: prompt }
      ]
    });

    const responseText = completion.choices[0].message.content;
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({ error: "Kunde inte tolka AI-svaret" });
    }

    const htmlBody = `
      <h1>🚀 Din AI-startupidé: ${data.companyName}</h1>
      <p><strong>Affärsidé:</strong> ${data.businessIdea}</p>
      <p><strong>Målgrupp:</strong> ${data.targetAudience}</p>
      <p><strong>Produktbeskrivning:</strong> ${data.productDescription}</p>
      <p><strong>FAQ:</strong><ul>
        ${data.faq.map(f => `<li><strong>${f.question}</strong>: ${f.answer}</li>`).join('')}
      </ul></p>
      <p><strong>Call-to-action:</strong> ${data.callToAction}</p>
      <p><strong>E-postämnesrad:</strong> ${data.emailSubject}</p>
      <p><strong>Facebook-annonser:</strong><ul>
        ${data.facebookAds.map(ad => `<li><strong>${ad.hook}</strong><br>${ad.value}<br><em>${ad.CTA}</em></li>`).join('')}
      </ul></p>
      <p><strong>Videoidé:</strong> ${data.videoIdea}</p>
      <p><strong>Pitchdeck:</strong> ${data.pitch}</p>
      <p><strong>Produktförslag:</strong> ${data.productSuggestion}</p>
      <hr/>
      <p style="font-style: italic;">Tack för att du använder Startpilot 🚀</p>
    `;

    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: `🚀 Din AI-startupidé: ${data.companyName}`,
      html: htmlBody
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Fel i generate.js:", err);
    return res.status(500).json({ error: "Något gick fel med AI eller e-post" });
  }
}
