export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Du är en pitch-coach som hjälper entreprenörer att formulera slagkraftiga AI-idéer." },
          { role: "user", content: `Ge mig en affärspitch baserad på denna idé: ${prompt}` }
        ],
        temperature: 0.7
      })
    });

    const data = await completion.json();
    const output = data.choices?.[0]?.message?.content || "Inget svar från AI:n.";

    res.status(200).json({ result: output });
  } catch (error) {
    console.error("GPT-4 Error:", error);
    res.status(500).json({ result: "Fel vid AI-generering." });
  }
}
