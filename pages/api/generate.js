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

// 🔧 Separera prompt för bättre hantering
const buildPrompt = (idea) => `Du är en AI-baserad startupcoach. Kunden skrev: "${idea}".
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
11. En onboarding-plan med steg
12. En unik AI-produktfunktion
13. Ett communityförslag (engagerande element)
14. 3 visuella frontend-idéer (animationer, layout, färger)
15. En AI-komponent som ska vara interaktiv på sidan (med kort förklaring)`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idea, email } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: buildPrompt(idea) }],
    });

    const content = completion.choices[0].message.content;

    const extract = (label) => {
      const match = content.match(new RegExp(`${label}:\\s*(.*)`));
      return match ? match[1] : null;
    };

    const parsedData = {
      email,
      idea,
      result: content,
      name: extract("Företagsnamn"),
      tagline: extract("Tagline"),
      target: extract("Målgrupp"),
      product: extract("Produktbeskrivning"),
      pitch_link: extract("Pitchdeck.*?"),
      video_link: extract("Videobeskrivning.*?"),
      store_link: extract("Butik.*?"),
      email_status: "Genererat",
    };

    const { error: dbError } = await supabase.from("user_data").insert([parsedData]);
    if (dbError) throw new Error("Databasfel: " + dbError.message);

    await transporter.sendMail({
      from: "Startpilot <info@startpilot.org>",
      to: email,
      subject: "🚀 Ditt AI-genererade affärspaket är klart!",
      text: content,
    });

    res.status(200).json({
      success: true,
      redirectTo: "/dashboard",
      loading: true,
    });
  } catch (error) {
    console.error("Fel i generate.js:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
