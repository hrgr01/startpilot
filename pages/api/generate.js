// pages/api/generate.js
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

    const content = completion.choices[0].message.content;

    // Parse GPT output to structured values (simple heuristic)
    const nameMatch = content.match(/Företagsnamn:\s*(.*)/);
    const pitchMatch = content.match(/Pitchdeck.*?:\s*(https?:\/\/\S+)/);
    const videoMatch = content.match(/Videobeskrivning.*?:\s*(https?:\/\/\S+)/);
    const storeMatch = content.match(/Butik.*?:\s*(https?:\/\/\S+)/);

    const parsedData = {
      email,
      idea,
      result: content,
      pitch_link: pitchMatch ? pitchMatch[1] : null,
      video_link: videoMatch ? videoMatch[1] : null,
      store_link: storeMatch ? storeMatch[1] : null,
    };

    await supabase.from("user_data").insert([parsedData]);

    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: "🚀 Ditt AI-genererade affärspaket är klart!",
      text: content,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
