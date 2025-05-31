// pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white px-6 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-transparent to-[#0f172a] blur-3xl opacity-20 z-0"></div>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 z-0"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
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

      <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center z-10 relative">
        {[
          {
            icon: "⚡",
            title: t("home.step1") || "Skriv din idé",
            desc: t("home.step1_desc") || "Berätta vad du vill skapa – med bara några ord."
          },
          {
            icon: "🤖",
            title: t("home.step2") || "AI bygger allt",
            desc: t("home.step2_desc") || "Vi skapar varumärke, pitch, annonsvideo och butik."
          },
          {
            icon: "🌍",
            title: t("home.step3") || "Lansera direkt",
            desc: t("home.step3_desc") || "Du får allt skickat till din mejl – redo att publicera."
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold mb-2">{step.icon} {step.title}</h3>
            <p className="text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-24 max-w-3xl mx-auto text-center text-gray-400 z-10 relative"
      >
        <h2 className="text-2xl font-semibold mb-4">🎬 {t("home.demo_title") || "Se hur det fungerar"}</h2>
        <video
          className="rounded-xl border border-white/10 mx-auto shadow-xl"
          src="/demo.mp4"
          controls
          autoPlay
          loop
          muted
        ></video>
      </motion.div>
    </div>
  );
}
