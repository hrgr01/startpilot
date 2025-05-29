// /pages/api/generate.js
import { OpenAI } from "openai";
import supabase from "../../utils/supabase";
import nodemailer from "nodemailer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8d3879001@smtp-brevo.com",
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idea, email } = req.body;

  if (!idea || !email) return res.status(400).json({ error: "Missing data" });

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
10. En kort videobeskrivning`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Ingen text genererad");

    // Skicka via e-post
    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: "🚀 Ditt AI-paket från Startpilot",
      text: content,
    });

    // Spara till Supabase
    await supabase.from("user_data").insert({ idea, email, result: content });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Fel i generering: ", err);
    return res.status(500).json({ error: err.message });
  }
}
