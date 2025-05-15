// /pages/form.js
import { useState } from "react";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fel:", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Skicka in din idé</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 text-black rounded"
            rows={4}
            placeholder="Ex: En AI som hjälper frisörer skapa Instagram-annonser"
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

        {data && (
          <div className="mt-10 space-y-6">
            <div className="bg-gray-800 p-6 rounded">
              <h2 className="text-xl font-semibold mb-2">🚀 {data["Företagsnamn"]} – {data["Tagline"]}</h2>
              <p className="text-gray-300 mb-2">{data["Affärsidé"]}</p>
              <p className="text-sm text-gray-400">Målgrupp: {data["Målgrupp"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">🛍️ Produktbeskrivning</h3>
              <p>{data["Produktbeskrivning"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">❓ FAQ</h3>
              <p>{data["FAQ (3 frågor)"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">🎯 Call to Action</h3>
              <p>{data["Call-to-action"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">📬 E-postämne</h3>
              <p>{data["E-postämnesrad"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">📣 Annonser</h3>
              <p>{data["3 Facebook-annonser (hook + värde + CTA)"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">🎬 Videoidé</h3>
              <p>{data["En kort videobeskrivning"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">🧾 Pitchdeck-text</h3>
              <p>{data["Text till pitchdeck"]}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">🛒 Produktförslag</h3>
              <p>{data["Förslag på produkt att sälja + dropshippingmodell"]}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
