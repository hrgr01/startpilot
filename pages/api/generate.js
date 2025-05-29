// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";
import supabase from "../../utils/supabase";

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
  if (!idea || !email) return res.status(400).json({ error: "Missing data" });

  try {
    const prompt = `Du är en AI-baserad startupcoach. Kunden skrev: \"${idea}\".
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
10. En kort videobeskrivning`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    const resultText = completion.choices[0].message.content;

    // ✉️ Skicka till e-post
    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: "🚀 Ditt AI-genererade affärspaket är klart!",
      text: resultText
    });

    // 💾 Spara till Supabase
    await supabase.from("user_data").insert([{ email, idea, result: resultText }]);

    res.status(200).json({ success: true, result: resultText });
  } catch (err) {
    console.error("Fel i generate.js:", err);
    res.status(500).json({ error: "Något gick fel." });
  }
}
