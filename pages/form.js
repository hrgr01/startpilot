// /pages/form.js
import { useState } from "react";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email }),
    });

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSent(true);
      setAiResult(data.result); // Visa resultat live
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center animate-fade-in">
        🚀 Skapa din AI-affärsidé med Startpilot
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1e293b] p-8 rounded-2xl shadow-lg animate-slide-up"
      >
        <label className="block mb-4">
          <span className="text-sm font-medium">Din affärsidé</span>
          <textarea
            required
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="T.ex. massagebokning-app för stressade människor"
            className="mt-1 w-full p-4 rounded-lg bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            rows={5}
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium">Din e-post</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="du@email.com"
            className="mt-1 w-full p-4 rounded-lg bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition text-white text-lg font-semibold"
        >
          {loading ? "Skickar..." : "Skapa AI-paket"}
        </button>

        {sent && (
          <p className="mt-6 text-center text-green-400 text-md font-medium animate-fade-in">
            ✅ Tack för att du använder Startpilot! Ditt AI-paket är skickat 💌
          </p>
        )}
      </form>

      {aiResult && (
        <div className="mt-12 w-full max-w-3xl bg-[#1e293b] p-6 rounded-xl shadow-xl animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-teal-300">🎁 Ditt AI-paket:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-300">{aiResult}</pre>
        </div>
      )}
    </div>
  );
}
