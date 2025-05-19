// /pages/dashboard.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createShopifyStore } from "@/utils/shopify";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    idea: "En AI som hjälper företag med TikTok-annonser",
    status: "Butik skapad",
    storeLink: "https://shopify.com/startpilot-demo",
    pitchLink: "/pitch/startpilot-pitch.pdf",
    videoLink: "/video/ai-video-demo.mp4",
    emailFlowStatus: "Utskick pågår",
    weeklySuggestions: [
      {
        title: "AI-genererade anslagstavlor för kontor",
        shopifyProduct: "anslagstavla"
      },
      {
        title: "Print-on-demand posters med motiverande citat",
        shopifyProduct: "poster"
      },
      {
        title: "Smarta kalendrar för ADHD-användare",
        shopifyProduct: "kalender"
      }
    ],
    pitchReady: false,
    emailReady: false,
    adsReady: false
  });

  const handleCreateStore = async (product) => {
    const response = await createShopifyStore(product);
    if (response?.url) window.open(response.url, "_blank");
  };

  const handleAIStoreGeneration = async () => {
    const res = await fetch("/api/create-ai-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: userData.idea })
    });
    const data = await res.json();
    if (data?.productLink) window.open(data.productLink, "_blank");
  };

  const handlePitchAndMarketing = async () => {
    const res = await fetch("/api/generate-assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: userData.idea })
    });
    const data = await res.json();
    if (data?.success) {
      setUserData((prev) => ({
        ...prev,
        pitchReady: true,
        emailReady: true,
        adsReady: true
      }));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          🧠 Din Startpilot-översikt
        </motion.h1>

        <div className="bg-white text-black p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Din affärsidé</h2>
          <p className="text-lg">{userData.idea}</p>
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={handleAIStoreGeneration}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🚀 Skapa Shopify-produkt med AI
            </button>
            <button
              onClick={handlePitchAndMarketing}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              🎯 Skapa pitchdeck + annonser + e-postflöde
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">📦 Butik</h3>
            <p>Status: {userData.status}</p>
            <a href={userData.storeLink} target="_blank" className="underline text-blue-400">
              Gå till butik
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">📬 E-postflöde</h3>
            <p>{userData.emailFlowStatus}</p>
            {userData.emailReady && <p className="text-green-400">✅ Klart</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">📄 Pitch Deck</h3>
            <a href={userData.pitchLink} target="_blank" className="underline text-blue-400">
              Se PDF
            </a>
            {userData.pitchReady && <p className="text-green-400">✅ Genererad</p>}
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-1">🎥 AI-video</h3>
            <a href={userData.videoLink} target="_blank" className="underline text-blue-400">
              Spela upp video
            </a>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-xl mt-10">
          <h2 className="text-2xl font-bold mb-4">✨ AI-förslag – Ny vecka, nya idéer</h2>
          <ul className="list-disc pl-5 space-y-3">
            {userData.weeklySuggestions.map((item, i) => (
              <li key={i}>
                <span className="font-medium">{item.title}</span>
                <br />
                <button
                  onClick={() => handleCreateStore(item.shopifyProduct)}
                  className="text-blue-500 underline mt-1"
                >
                  ➕ Lägg till i Shopify-butiken
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
