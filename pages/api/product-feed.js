import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Ge 5 innovativa produkter med namn, kategori och beskrivning att sälja online i en lista.",
    max_tokens: 200
  });
  const ideas = response.data.choices[0].text.trim();
  res.status(200).json({ week: new Date().toISOString().split("T")[0], ideas });
}
