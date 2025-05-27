import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { idea } = req.body;
  const prompt = `Skriv en Facebook-annons för följande idé: "${idea}". Använd en stark hook, visa värde och avsluta med call-to-action.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 150,
  });

  res.status(200).json({ ad: response.data.choices[0].text.trim() });
}
