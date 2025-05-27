import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Importera utan SSR (ny uppdaterad 3D-komponent)
const Futuristic3DHero = dynamic(() => import("../components/Futuristic3DHero"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Hero 3D-sektion överst */}
      <Futuristic3DHero />

      {/* Vanliga hero-rubriken */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-6"
        >
          Skapa ditt AI-drivna företag på 24 timmar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-gray-300 max-w-xl mx-auto"
        >
          Startpilot analyserar din idé, bygger en affärsmodell, skapar pitchdeck, video och marknadsföring – automatiskt.
        </motion.p>
        <div className="mt-10 flex justify-center gap-6">
          <Link href="/form">
            <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:scale-105 transition">
              Starta gratis
            </button>
          </Link>
          <Link href="/pricing">
            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition">
              Se paket
            </button>
          </Link>
        </div>
      </section>

      {/* Funktioner */}
      <section className="bg-gray-900 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Vad AI:n gör åt dig</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            ["📦", "Bygger butik"],
            ["🧠", "Skapar affärsidé"],
            ["📽️", "Genererar video"],
            ["📊", "Skapar pitchdeck"]
          ].map(([emoji, title]) => (
            <div key={title} className="bg-black border border-gray-700 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">{emoji}</div>
              <p className="text-lg font-medium">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exempelvideo */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Exempel på vad du får</h2>
        <div className="flex justify-center">
          <Image src="/demo.png" alt="AI pitch demo" width={700} height={400} className="rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Startpilot. info@startpilot.org
      </footer>
    </main>
  );
}
