// /pages/invest.js
import { motion } from "framer-motion";

export default function Invest() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          💼 Investera i Startpilot
        </motion.h1>

        <p className="text-lg text-gray-300 mb-6">
          Vill du vara en del av framtidens automatiserade entreprenörsplattform?
          Vi söker investerare och partners som vill ta del av vår resa.
        </p>

        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-6">
          <li>🚀 Skalbar AI-teknologi inom e-handel & automation</li>
          <li>💰 Tydlig intäktsmodell (SaaS + affiliate + Shopify)</li>
          <li>🌍 Globalt tillgänglig – redan lanserad på flera språk</li>
          <li>🧠 Byggt av AI – uppdateras och optimeras automatiskt</li>
        </ul>

        <a
          href="https://startpilot.org/startpilot_pitchdeck.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-white text-black font-bold py-3 px-6 rounded mb-8 hover:scale-105 transition"
        >
          📄 Ladda ner vårt investerar-PDF
        </a>

        <p className="text-center text-gray-400">
          Kontakta oss på <span className="underline">invest@startpilot.org</span> så hör vi av oss!
        </p>
      </div>
    </main>
  );
}
