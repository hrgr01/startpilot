// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-transparent to-[#0f172a] blur-3xl opacity-30 z-0"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 z-0"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10 animate-fade-in-up">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          🚀 Starta ditt AI-företag på 24h
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg max-w-2xl mx-auto mb-10"
        >
          Startpilot genererar hela ditt företag: affärsidé, varumärke, hemsida, butik, pitchdeck, annonser och video automatiskt – allt på några sekunder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link href="#form">
            <a className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all">
              🚀 Starta gratis
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="border border-white/20 px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
              📊 Se dina idéer
            </a>
          </Link>
        </motion.div>
      </div>

      <div className="mt-24 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative z-10 animate-fade-in-up">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">⚡ Steg 1</h3>
          <p className="text-gray-400">Skriv in din affärsidé</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">🤖 Steg 2</h3>
          <p className="text-gray-400">AI genererar hela företaget åt dig</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">🌍 Steg 3</h3>
          <p className="text-gray-400">Du får en färdig butik, pitch, video & e-post</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-28 max-w-3xl mx-auto text-center text-gray-400 relative z-10"
      >
        <h2 className="text-2xl font-semibold mb-4">🎬 Se det i action</h2>
        <video
          className="rounded-xl border border-white/10 mx-auto shadow-xl"
          src="/demo.mp4"
          controls
          autoPlay
          loop
          muted
        ></video>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-20 max-w-xl mx-auto text-center relative z-10"
      >
        <h3 className="text-xl font-bold text-white mb-2">💳 Redo att köpa?</h3>
        <p className="text-gray-400 mb-4">Välj ditt AI-paket och gå vidare till säker betalning via Stripe:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://buy.stripe.com/5kA005eGdffZfXGeUU" className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold text-white shadow block text-center">Starter</a>
          <a href="https://buy.stripe.com/8wMbIN55D8RBdPy6op" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white shadow block text-center">Pro</a>
          <a href="https://buy.stripe.com/14k6otgOl9VFbHqfZ0" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white shadow block text-center">Creator</a>
          <a href="https://buy.stripe.com/5kAfZ38hPebVh1K3cf" className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold text-white shadow block text-center">Enterprise</a>
          <a href="https://buy.stripe.com/9AQ5kp2XvebV12MaEI" className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold text-white shadow block text-center">Custom</a>
        </div>
      </motion.div>
    </div>
  );
}
