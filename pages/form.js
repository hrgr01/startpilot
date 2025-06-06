// /pages/form.js
import { useState } from "react";
import supabase from "../utils/supabase";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from("user_data").insert([
      { email, idea }
    ]);

    if (!error) setSent(true);
    else alert("Fel: " + error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        🚀 Skapa din AI-affärside med Startpilot
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1e293b] p-8 rounded-2xl shadow-lg"
      >
        <label className="block mb-4">
          <span className="text-sm font-medium">Din affärside</span>
          <textarea
            required
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="T.ex. massagebokningsapp för stressade människor"
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
          <p className="mt-6 text-center text-green-400 text-md font-medium">
            ✅ Tack för att du använder Startpilot! Ditt AI-paket är skickat 💌
          </p>
        )}
      </form>
    </div>
  );
}
