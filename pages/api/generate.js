// /pages/api/generate.js
import { OpenAI } from "openai";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
Generera:
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
      temperature: 0.8
    });

    const content = completion.choices[0].message.content;

    // 💾 Spara till Supabase
    const { error } = await supabase.from("user_data").insert([
      {
        email,
        idea,
        ai_output: content,
        store_link: "",
        pitch_link: "",
        video_link: "",
        email_status: "Ej skickat"
      }
    ]);

    if (error) {
      console.error("Supabase error:", error.message);
    }

    // 📧 Skicka mejl till användaren
    await transporter.sendMail({
      from: "info@startpilot.org",
      to: email,
      subject: "Ditt AI-startpaket från Startpilot 🚀",
      text: content
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: "Något gick fel" });
  }
}
