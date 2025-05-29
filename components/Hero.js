import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          🚀 Starta din AI-baserade business <br className="hidden md:block" /> på 24 timmar
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Med hjälp av Startpilot skapar du din egen AI-genererade affärsidé – komplett med butik, pitch, video och e-postflöde.
        </p>
        <Link href="/form">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-teal-500 hover:bg-teal-600 transition px-8 py-4 text-white font-semibold text-lg rounded-xl shadow-lg"
          >
            Starta gratis →
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-pink-500/10 rounded-3xl blur-3xl"
      />
    </div>
  );
}
