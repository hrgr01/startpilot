// components/Hero.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function Hero() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedQuestion, setDebouncedQuestion] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuestion(question);
    }, 300);
    return () => clearTimeout(timer);
  }, [question]);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };
    getSession();
  }, []);

  const handleClick = () => {
    router.push("/#form");
  };

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: debouncedQuestion })
      });
      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      setResponse("Något gick fel. Försök igen senare.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-[#0f172a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          🚀 Starta ditt nästa företag med AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Skriv in din idé så bygger Startpilot ett komplett affärspaket på några sekunder. Allt skickas till din mejl – 100 % gratis.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg rounded-xl shadow-lg cursor-pointer"
          onClick={handleClick}
        >
          Kom igång nu
        </motion.div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-[#1e293b] p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">💬 Har du frågor? Vår AI-chatt hjälper dig direkt</h2>
          <input
            placeholder="Skriv din fråga här..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-4 rounded-md bg-[#0f172a] border border-gray-600 text-white focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleAsk}
            className="mt-4 px-6 py-2 bg-teal-600 rounded hover:bg-teal-700 text-white flex items-center gap-2 disabled:opacity-50"
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <span className="animate-ping inline-block w-3 h-3 bg-white rounded-full"></span>
            ) : (
              "Ställ fråga"
            )}
          </button>
          {response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-4 bg-[#0f172a] p-4 rounded text-gray-200 border border-gray-700"
            >
              <strong>AI:</strong> {response}
            </motion.div>
          )}
        </motion.div>

        {userEmail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 bg-[#1e293b] p-6 rounded-xl shadow-lg text-white"
          >
            <h3 className="text-xl font-semibold mb-4">📂 Du är inloggad som {userEmail}</h3>
            <p className="mb-2">👉 Gå till din <a href="/dashboard" className="text-teal-400 underline">dashboard</a> för att se dina AI-paket.</p>
            <p className="mb-2">➕ <a href="/#form" className="text-teal-400 underline">Skapa ett nytt AI-paket</a> direkt här.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
