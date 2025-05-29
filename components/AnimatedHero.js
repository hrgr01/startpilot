// /components/AnimatedHero.js
import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-4">
          🚀 Välkommen till <span className="text-teal-400">Startpilot</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Skapa din AI-affärsidé, pitch, butik och kampanj – automatiskt.
        </p>
        <a
          href="/form"
          className="inline-block px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition font-semibold"
        >
          Starta gratis
        </a>
      </motion.div>
    </section>
  );
}
