// /pages/form.js
import { useState } from "react";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Skicka till din backend
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email }),
    });

    // Också skicka till Make.com webhook (för Google Sheet loggning)
    await fetch("https://hook.integromat.com/DITT-WEBHOOK-ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email }),
    });

    setLoading(false);
    if (res.ok) setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        🚀 Skapa din AI-affärsidé med Startpilot
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1e293b] p-8 rounded-2xl shadow-lg"
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

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
          </div>
        )}

        {sent && (
          <p className="mt-6 text-center text-green-400 text-md font-medium">
            ✅ Tack för att du använder Startpilot! Ditt AI-paket är skickat 💌
          </p>
        )}
      </form>

      <div className="mt-12 max-w-xl text-center text-gray-400 text-sm space-y-4">
        <p>⭐️ \"Jag skickade in min idé och fick tillbaka en komplett AI-plan – magiskt!\"</p>
        <p>🔥 \"Startpilot hjälpte mig starta mitt bolag på 2 dagar!\"</p>
        <p>🚀 \"Bästa AI-verktyget jag testat. Snyggt, enkelt, kraftfullt.\"</p>
      </div>
    </div>
  );
}
