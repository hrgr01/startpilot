// /pages/api/generate-video.js
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { pitch } = req.body;

  const prompt = `Skapa ett manus för en TikTok-video (max 60 sek) baserat på följande affärspitch: \"${pitch}\".
Svara med:
1. Hook (första 3 sek)
2. Tonalitet (ex: snabb, rolig, seriös)
3. Videosekvenser (beskrivning av klipp: t.ex. öppningsbild, övergångar, text på skärm)
4. Röstspår (vad som sägs i varje del)
5. Avslutning med call-to-action
Returnera som JSON.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const videoPlan = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ video: videoPlan });
  } catch (err) {
    console.error("Video error:", err);
    res.status(500).json({ error: "Kunde inte generera videoidé." });
  }
}
