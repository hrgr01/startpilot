// /pages/form.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {!sent && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl bg-[#1e293b] p-8 rounded-2xl shadow-lg"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              🚀 Skapa din AI-affärsidé med Startpilot
            </h1>

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
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sent && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mt-10"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              ✅ Tack för att du använder Startpilot!
            </h2>
            <p className="text-lg text-gray-300">
              Ditt personliga AI-paket är skickat till <span className="font-semibold text-white">{email}</span> 💌
            </p>
            <p className="mt-4 text-sm text-gray-500 italic">
              Vi tror på din idé. Vi är bara i början. 💼
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
