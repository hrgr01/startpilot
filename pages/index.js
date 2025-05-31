// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          {t("home.hero_title") || "Bygg ditt nästa företag på 24h med AI"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
        >
          {t("home.hero_subtitle") || "Startpilot skapar din affärsidé, pitch, varumärke, butik, annonsvideo och e-post – automatiskt."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link href="#form">
            <a className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl font-semibold shadow-lg">
              🚀 {t("home.cta") || "Starta gratis"}
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="border border-white/20 px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10">
              📊 {t("home.view_dashboard") || "Se dina idéer"}
            </a>
          </Link>
        </motion.div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">⚡ {t("home.step1") || "Skriv din idé"}</h3>
          <p className="text-gray-400">{t("home.step1_desc") || "Berätta vad du vill skapa – med bara några ord."}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">🤖 {t("home.step2") || "AI bygger allt"}</h3>
          <p className="text-gray-400">{t("home.step2_desc") || "Vi skapar varumärke, pitch, annonsvideo och butik."}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">🌍 {t("home.step3") || "Lansera direkt"}</h3>
          <p className="text-gray-400">{t("home.step3_desc") || "Du får allt skickat till din mejl – redo att publicera."}</p>
        </div>
      </div>
    </div>
  );
}
