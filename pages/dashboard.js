// /pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import supabase from "../utils/supabase";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (!session || !session.user?.email) {
        router.push("/login");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("user_data")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (fetchError || !data) {
        console.error("Ingen användardata hittades", fetchError);
        router.push("/form");
        return;
      }

      setUserData(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

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

        <div className="bg-white text-black p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Affärsidé</h2>
          <p className="text-lg">{userData.idea}</p>

          <div className="mt-4 flex flex-col gap-3">
            <a
              href={userData.store_link || "#"}
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              🚀 Gå till din Shopify-butik
            </a>
            <a
              href={userData.pitch_link || "#"}
              target="_blank"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
            >
              🎯 Visa pitchdeck
            </a>
            <a
              href={userData.video_link || "#"}
              target="_blank"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
            >
              🎥 Se AI-video
            </a>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">📬 E-postflöde</h3>
          <p>Status: {userData.email_status || "Ej påbörjat"}</p>
        </div>
      </div>
    </main>
  );
}
