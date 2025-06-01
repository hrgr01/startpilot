// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("../components/Globe"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 relative overflow-hidden font-sans">
      {/* Bakgrundsanimation + jordglob */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 blur-2xl opacity-30 z-0"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700/20 via-transparent to-gray-700/20 z-0"></div>
      <div className="absolute right-0 top-0 w-full h-[600px] z-0 opacity-20 pointer-events-none">
        <Globe />
      </div>

      {/* Hero */}
      <div className="relative max-w-6xl mx-auto text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link href="#form">
            <a className="bg-white text-black px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-110 hover:shadow-white/80 transition transform duration-300">
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
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            className="bg-gradient-to-br from-zinc-800 to-gray-900 hover:from-zinc-700 hover:to-gray-800 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transform duration-300 backdrop-blur-lg border border-white/10"
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
        className="mt-28 max-w-5xl mx-auto text-center relative z-10"
      >
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow">💳 Redo att köpa?</h3>
        <p className="text-gray-400 mb-6">Välj ditt AI-paket och gå vidare till säker betalning via Stripe:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            name: "Starter",
            url: "https://buy.stripe.com/5kA005eGdffZfXGeUU"
          }, {
            name: "Pro",
            url: "https://buy.stripe.com/8wMbIN55D8RBdPy6op"
          }, {
            name: "Creator",
            url: "https://buy.stripe.com/14k6otgOl9VFbHqfZ0"
          }, {
            name: "Enterprise",
            url: "https://buy.stripe.com/5kAfZ38hPebVh1K3cf"
          }, {
            name: "Custom",
            url: "https://buy.stripe.com/9AQ5kp2XvebV12MaEI"
          }].map((pkg, i) => (
            <a
              key={i}
              href={pkg.url}
              className="bg-gradient-to-tr from-zinc-800 to-gray-900 hover:from-zinc-700 hover:to-gray-800 px-6 py-5 rounded-2xl font-semibold text-white shadow-xl hover:shadow-teal-500/50 transition duration-300 block border border-white/10"
            >
              {pkg.name}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
