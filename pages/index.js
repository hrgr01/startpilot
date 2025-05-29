// pages/index.js
import Hero from "../components/Hero";
import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
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
    setLoading(false);

    // Redirect to dashboard after success
    if (data && data.success) router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Startpilot – Skapa din AI-affär</title>
      </Head>

      <main className="bg-[#0f172a] min-h-screen text-white px-6 py-12">
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            🚀 Starta ditt nästa företag med AI
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Skriv in din idé så bygger Startpilot ett komplett affärspaket på några sekunder. Allt skickas till din mejl – 100 % gratis.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] max-w-xl mx-auto p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
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
            className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg rounded-xl font-semibold"
          >
            {loading ? "Skickar..." : "Skapa AI-paket"}
          </button>
        </motion.form>

        {loading && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-teal-400">🚀 Startpilot arbetar på din idé...</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-3xl mx-auto p-8 bg-[#1e293b] rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">✅ Ditt AI-paket är klart!</h2>
            <ul className="space-y-3 text-md">
              <li><strong>📛 Företagsnamn:</strong> {result.name}</li>
              <li><strong>🎯 Målgrupp:</strong> {result.target}</li>
              <li><strong>📦 Produkt:</strong> {result.product}</li>
              <li><strong>🎤 Pitch:</strong> {result.pitch}</li>
              <li><strong>📣 Facebook-Annons:</strong> {result.ad1}</li>
            </ul>
            <p className="mt-6 text-sm text-gray-400">💌 Du har även fått allting till din mejl!</p>
          </motion.div>
        )}
      </main>
    </>
  );
}
