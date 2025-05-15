import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Form() {
  const [idea, setIdea] = useState("");
  const [refBy, setRefBy] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ref = localStorage.getItem("ref");
    if (ref) setRefBy(ref);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await supabase.from("orders").insert([{ idea, refBy }]);

    const pitch = await generatePitch(idea);
    setAiResponse(pitch);
    setSubmitted(true);
    setLoading(false);
  };

  const generatePitch = async (userIdea) => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userIdea })
      });
      const data = await res.json();
      return data.result || "Kunde inte generera pitch just nu.";
    } catch (err) {
      return "Fel vid AI-generering.";
    }
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">✅ Idén är inskickad!</h2>
        <p className="mb-4">Här är vad AI:n genererade utifrån din idé:</p>
        <div className="bg-gray-100 p-4 rounded text-left whitespace-pre-line">
          <p>{aiResponse}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">💡 Skicka in din AI-idé</h1>

      <textarea
        className="border p-3 w-full rounded mb-4"
        rows={4}
        placeholder="Ex: En AI som hjälper småföretagare med TikTok-annonser..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
        disabled={loading}
      >
        {loading ? "Genererar pitch..." : "Skicka in"}
      </button>
    </form>
  );
}
