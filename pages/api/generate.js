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

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4"
  });

  const content = completion.choices[0].message.content;

  await transporter.sendMail({
    from: "Startpilot <info@startpilot.org>",
    to: email,
    subject: "Ditt AI-paket från Startpilot",
    text: content
  });

  // Låtsasgenererade resurser - byt mot riktiga URL:er senare
  const storeLink = "https://shopify.com/startpilot-demo";
  const pitchLink = "/pitch/startpilot-pitch.pdf";
  const videoLink = "/video/ai-video-demo.mp4";

  await supabase.from("user_data").insert({
    email,
    idea,
    store_link: storeLink,
    pitch_link: pitchLink,
    video_link: videoLink,
    email_status: "Utskickat"
  });

  res.status(200).json({ success: true });
}
