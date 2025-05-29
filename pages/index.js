// pages/index.js
import Hero from "../components/Hero";
import { useState } from "react";
import Head from "next/head";
import supabase from "../utils/supabase";
import { useRouter } from "next/router";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email })
    });
    const data = await res.json();
    setResult(data);

    const { error } = await supabase.from("user_data").insert([
      {
        email,
        idea,
        name: data.name,
        target: data.target,
        product: data.product,
        pitch: data.pitch,
        ad1: data.ad1,
        created_at: new Date().toISOString()
      }
    ]);

    if (!error) {
      router.push("/dashboard");
    } else {
      console.error("Supabase error:", error.message);
      alert("Kunde inte spara i databasen, men du har fått mejlet!");
    }
    setLoading(false);
  };

  return (
    <>
      <Hero />
      <div className="bg-[#0f172a] min-h-screen text-white px-6 py-12">
        <Head>
          <title>Startpilot – Skapa din AI-affär</title>
        </Head>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            🚀 Starta ditt nästa företag med AI
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Skriv in din idé så bygger Startpilot ett komplett affärspaket. Allt skickas till din mejl – 100 % gratis.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] max-w-xl mx-auto p-8 rounded-2xl shadow-lg"
        >
          <label className="block mb-4">
            <span className="text-sm font-medium">Din affärside</span>
            <textarea
              required
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="w-full mt-1 p-4 bg-[#0f172a] border border-gray-600 rounded-lg focus:outline-none"
              placeholder="T.ex. AI-tränare för stressade småbarnsföräldrar"
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
              className="w-full mt-1 p-4 bg-[#0f172a] border border-gray-600 rounded-lg focus:outline-none"
              placeholder="du@email.com"
            />
          </label>
          <button
            disabled={loading}
            className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg rounded-xl font-semibold flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Skickar...
              </span>
            ) : (
              "Skapa AI-paket"
            )}
          </button>
        </form>

        {result && (
          <div className="mt-12 max-w-3xl mx-auto p-8 bg-[#1e293b] rounded-2xl shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              ✅ Ditt AI-paket är klart!
            </h2>
            <ul className="space-y-3 text-md">
              <li>
                <strong>💛 Företagsnamn:</strong> {result.name}
              </li>
              <li>
                <strong>🎯 Målgrupp:</strong> {result.target}
              </li>
              <li>
                <strong>📦 Produkt:</strong> {result.product}
              </li>
              <li>
                <strong>🎤 Pitch:</strong> {result.pitch}
              </li>
              <li>
                <strong>📣 Facebook-Annons:</strong> {result.ad1}
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray-400">
              📬 Du har även fått allting till din mejl!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
