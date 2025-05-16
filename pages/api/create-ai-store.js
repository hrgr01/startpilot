// /pages/api/create-ai-store.js
import { createShopifyStore } from "../../utils/shopify";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { idea } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du är en e-handelsstrateg som skapar butiksideér från prompts."
        },
        {
          role: "user",
          content: `Skapa ett produktnamn och kort beskrivning för: ${idea}`
        }
      ]
    });

    const aiText = completion.choices[0].message.content;
    const [titleLine, ...descLines] = aiText.split("\n");
    const title = titleLine.replace("Produktnamn:", "").trim();
    const body_html = descLines.join("\n").replace("Beskrivning:", "").trim();

    const productPayload = {
      title,
      body_html
    };

    const result = await createShopifyStore(productPayload.title);
    res.status(200).json({ success: true, productLink: result.url });
  } catch (error) {
    console.error("AI/shopify error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
