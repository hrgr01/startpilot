// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 relative overflow-hidden font-sans">
      {/* Bakgrundsanimation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 blur-3xl opacity-40 z-0"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700/20 via-transparent to-gray-700/20 z-0"></div>

      {/* Hero */}
      <div className="relative max-w-6xl mx-auto text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-xl"
        >
          🚀 Starta ditt AI-företag på 24 timmar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 drop-shadow"
        >
          En AI-plattform som automatiskt bygger din idé – från affärsidé till färdig butik och pitch. Allt med ett klick.
        </motion.p>

        {/* CTA-knappar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link href="#form">
            <a className="bg-white text-black px-8 py-4 rounded-full font-semibold shadow-2xl hover:scale-110 hover:shadow-white transition transform duration-300">
              🚀 Testa gratis
            </a>
          </Link>
        </motion.div>
      </div>

      {/* Processen */}
      <div className="mt-28 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
        {["Din idé", "AI bygger", "Du lanserar"].map((title, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotate: 1 }}
            className="bg-gray-900 hover:bg-gray-800 transition rounded-2xl p-6 shadow-2xl transform duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{[
              "Beskriv vad du vill skapa",
              "Startpilot bygger hemsida, butik & pitch",
              "Du får en färdig lösning redo att användas"
            ][i]}</p>
          </motion.div>
        ))}
      </div>

      {/* Demo video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-32 max-w-3xl mx-auto text-center text-gray-400 relative z-10"
      >
        <h2 className="text-2xl font-semibold mb-4 drop-shadow-lg">🎬 Se hur det funkar</h2>
        <video
          className="rounded-xl border border-white/10 mx-auto shadow-2xl hover:scale-105 transition duration-500"
          src="/demo.mp4"
          controls
          autoPlay
          loop
          muted
        ></video>
      </motion.div>

      {/* Stripe-paket */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-28 max-w-xl mx-auto text-center relative z-10"
      >
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow">💳 Redo att köpa?</h3>
        <p className="text-gray-400 mb-4">Välj ditt AI-paket och gå vidare till säker betalning via Stripe:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://buy.stripe.com/5kA005eGdffZfXGeUU" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-teal-500/50 transition duration-300 block text-center border border-gray-700">Starter</a>
          <a href="https://buy.stripe.com/8wMbIN55D8RBdPy6op" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-teal-500/50 transition duration-300 block text-center border border-gray-700">Pro</a>
          <a href="https://buy.stripe.com/14k6otgOl9VFbHqfZ0" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-teal-500/50 transition duration-300 block text-center border border-gray-700">Creator</a>
          <a href="https://buy.stripe.com/5kAfZ38hPebVh1K3cf" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-teal-500/50 transition duration-300 block text-center border border-gray-700">Enterprise</a>
          <a href="https://buy.stripe.com/9AQ5kp2XvebV12MaEI" className="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-teal-500/50 transition duration-300 block text-center border border-gray-700">Custom</a>
        </div>
      </motion.div>
    </div>
  );
}
