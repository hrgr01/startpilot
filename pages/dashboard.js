// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFull, setShowFull] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      fetchIdeas(session.user.email);
    };

    getUser();
  }, []);

  const fetchIdeas = async (email) => {
    const { data, error } = await supabase
      .from("ai_ideas")
      .select("id, name, pitch, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setIdeas(data);
    } else {
      console.error("Error fetching ideas:", error?.message);
    }
    setLoading(false);
  };

  const toggleView = (id) => {
    setShowFull((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-transparent to-[#0f172a] blur-3xl opacity-30 z-0"></div>
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-xl z-10 relative max-w-5xl mx-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          📊 Din AI-dashboard
        </motion.h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <h3 className="text-sm text-gray-400">Totalt paket</h3>
            <p className="text-2xl font-bold">{ideas.length}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <h3 className="text-sm text-gray-400">Senaste idé</h3>
            <p className="text-md">{ideas[0]?.name || "-"}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <h3 className="text-sm text-gray-400">Senaste datum</h3>
            <p className="text-md">{ideas[0] ? new Date(ideas[0].created_at).toLocaleDateString() : "-"}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <h3 className="text-sm text-gray-400">Din AI-score</h3>
            <p className="text-xl text-green-400 font-semibold">86%</p>
          </div>
        </div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="flex justify-center items-center"
          >
            <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-400">🔄 Laddar dina AI-idéer...</span>
          </motion.div>
        ) : ideas.length > 0 ? (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {ideas.map((idea) => (
              <motion.li
                key={idea.id}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/10 border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2">
                  <span className="text-sm bg-teal-600 text-white px-2 py-1 rounded-full animate-pulse">AI Score: 86%</span>
                </div>
                <motion.h2 className="text-2xl font-semibold mb-2 text-white">
                  {idea.name}
                </motion.h2>
                <p className="text-gray-300 mb-1">
                  {showFull[idea.id] ? idea.pitch : `${idea.pitch.slice(0, 140)}...`}
                </p>
                <p className="text-sm text-gray-500">
                  Skapad: {new Date(idea.created_at).toLocaleString()}
                </p>
                <button
                  className="mt-2 text-sm text-teal-400 hover:underline"
                  onClick={() => toggleView(idea.id)}
                >
                  {showFull[idea.id] ? "Visa mindre" : "Visa mer"}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-gray-400 text-center"
          >
            ❗ Du har ännu inga sparade AI-paket.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <a
            href="/#form"
            className="bg-teal-500 hover:bg-teal-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 rounded-xl blur-sm opacity-20 animate-pulse"></span>
            <span className="relative">➕ Skapa nytt AI-paket</span>
          </a>
          <a
            href="/chat"
            className="bg-indigo-500 hover:bg-indigo-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 rounded-xl blur-sm opacity-20 animate-pulse"></span>
            <span className="relative">💬 Öppna AI-chatten</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
