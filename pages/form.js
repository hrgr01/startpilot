// /pages/form.js
import { useState } from "react";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      setResult(data.pitch);
    } catch (err) {
      console.error("Något gick fel:", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Skicka in din affärsidé</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 text-black rounded"
            rows={5}
            placeholder="Ex: En AI som hjälper frisörer att skapa Instagram-annonser"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded font-medium hover:scale-105 transition"
            disabled={loading}
          >
            {loading ? "Genererar..." : "Skicka"}
          </button>
        </form>

        {result && (
          <div className="mt-10 p-6 border rounded bg-gray-800">
            <h2 className="text-xl font-bold mb-2">Din AI-genererade pitch</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
} // Nästa: Jag lägger in /api/generate.js som hanterar GPT-svaret.
