// /pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklySuggestions, setWeeklySuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        router.push("/login");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("user_data")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (fetchError || !data) {
        console.error("Kunde inte hämta användardata", fetchError);
        router.push("/form");
        return;
      }

      setUserData(data);
      setWeeklySuggestions([
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
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleCreateStore = async (product) => {
    const res = await fetch("/api/create-ai-store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: product })
    });
    const data = await res.json();
    if (data?.url) window.open(data.url, "_blank");
  };

  const handlePitchAndMarketing = async () => {
    const res = await fetch("/api/generate-assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea: userData.idea })
    });
    const data = await res.json();
    if (data?.success) alert("✅ Pitch och marknadsföring skapad!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Laddar din dashboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          🧠 Din personliga Startpilot Dashboard
        </motion.h1>

        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
        >
          Logga ut
        </button>

        <div className="bg-white text-black p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Affärsidé</h2>
          <p className="text-lg">{userData.idea}</p>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={userData.store_link}
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              🚀 Gå till din Shopify-butik
            </a>
            <a
              href={userData.pitch_link}
              target="_blank"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
            >
              🎯 Visa pitchdeck
            </a>
            <a
              href={userData.video_link}
              target="_blank"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
            >
              🎥 Se AI-video
            </a>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold mb-4">📬 E-postflöde</h3>
          <p>Status: {userData.email_status || "Ej påbörjat"}</p>
        </div>

        <div className="bg-white text-black p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold mb-4">✨ AI-förslag för nya produkter</h3>
          <ul className="list-disc pl-5 space-y-3">
            {weeklySuggestions.map((item, i) => (
              <li key={i}>
                <span className="font-medium">{item.title}</span>
                <br />
                <button
                  onClick={() => handleCreateStore(item.shopifyProduct)}
                  className="text-blue-500 underline mt-1"
                >
                  ➕ Skapa produkt
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white text-black p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">🎯 Skapa marknadsföringspaket</h3>
          <button
            onClick={handlePitchAndMarketing}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Generera pitch + video + e-post
          </button>
        </div>
      </div>
    </main>
  );
}
