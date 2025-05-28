// /pages/form.js
import { useState } from "react";
import { motion } from "framer-motion";

export default function FormPage() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email }),
    });
    setLoading(false);
    if (res.ok) setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-6 text-center"
      >
        🚀 Skapa din AI-affärsidé med Startpilot
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1e293b] p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
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

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition text-white text-lg font-semibold"
        >
          {loading ? "Skickar..." : "Skapa AI-paket"}
        </motion.button>

        {sent && (
          <motion.p
            className="mt-6 text-center text-green-400 text-md font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✅ Tack för att du använder Startpilot! Ditt AI-paket är skickat 💌
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}
