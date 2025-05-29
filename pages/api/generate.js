// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";
import supabase from "../../utils/supabase";

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

  const prompt = `Du är en AI-startupcoach. Kunden skrev: "${idea}".
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

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4"
  });

  const content = chatCompletion.choices[0].message.content;

  await supabase.from("user_data").insert([{ email, idea, full_output: content }]);

  await transporter.sendMail({
    from: "info@startpilot.org",
    to: email,
    subject: "🚀 Ditt AI-startpaket från Startpilot",
    text: content
  });

  res.status(200).json({ success: true, full_output: content });
}
