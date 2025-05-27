// /pages/api/generate-assets.js
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { idea } = req.body;
  if (!idea) return res.status(400).json({ error: "Missing idea" });

  try {
    const [pitch, email, ad] = await Promise.all([
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Skapa ett professionellt pitchdeck för affärsidén: \"${idea}\". Skriv det i punktform, slide för slide.`,
        max_tokens: 500
      }),
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Skriv ett 5-dagars e-postflöde för lanseringen av denna idé: \"${idea}\". Varje e-post ska ha en stark rubrik, innehåll och call-to-action.`,
        max_tokens: 600
      }),
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Skriv en Facebook/TikTok-annons för denna affärsidé: \"${idea}\". Använd psykologiska triggers, stark öppning och call-to-action.`,
        max_tokens: 300
      })
    ]);

    return res.status(200).json({
      success: true,
      pitch: pitch.data.choices[0].text,
      email: email.data.choices[0].text,
      ad: ad.data.choices[0].text
    });
  } catch (err) {
    console.error("AI generation failed", err);
    return res.status(500).json({ error: "AI generation failed" });
  }
}
