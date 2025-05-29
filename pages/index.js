// pages/index.js
import Hero from "../components/Hero";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <>
      <Hero />
      <div className="bg-[#0f172a] min-h-screen text-white px-6 py-12">
        <Head>
          <title>Startpilot – Skapa din AI-affärside</title>
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
          className="bg-[#1e293b] max-w-xl mx-auto p-8 rounded-2xl shadow-lg animate-fade-in"
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
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
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
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Skickar..." : "Skapa AI-paket"}
          </button>
        </form>

        {success && (
          <div className="text-center mt-10 text-green-400 text-xl animate-fade-in">
            ✅ Ditt AI-paket genererades! Omdirigerar till din dashboard...
          </div>
        )}
      </div>
    </>
  );
}
