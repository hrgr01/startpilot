// /components/AnimatedHero.js
import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        🚀 Starta ditt AI-företag på 24 timmar
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg md:text-2xl max-w-3xl mb-10 text-gray-300"
      >
        Få en AI-genererad affärsidé, pitchdeck, butik, annonser och e-postflöde. Allt i ett klick.
      </motion.p>

      <motion.a
        href="/form"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition text-white text-lg font-semibold shadow-lg"
      >
        🎯 Kom igång gratis
      </motion.a>
    </section>
  );
}
