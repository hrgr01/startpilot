// pages/index.js
import Hero from "../components/Hero";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

    if (data.success) {
      router.push("/dashboard");
    } else {
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <>
      <Hero />
      <div className="bg-[#0f172a] min-h-screen text-white px-6 py-12">
        <Head>
          <title>Startpilot – Skapa din AI-affärsidé</title>
        </Head>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            🚀 Starta ditt nästa företag med AI
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Skriv in din idé så bygger Startpilot ett komplett affärspaket på några sekunder. Allt skickas till din mejl – 100 % gratis.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1e293b] max-w-xl mx-auto p-8 rounded-2xl shadow-lg"
        >
          <label className="block mb-4">
            <span className="text-sm font-medium">Din affärsidé</span>
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
        </form>
      </div>
    </>
  );
}
