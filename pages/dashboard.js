// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          📊 Din AI-dashboard
        </motion.h1>

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
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-4"
          >
            {ideas.map((idea) => (
              <motion.li
                key={idea.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-xl"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold mb-2"
                >
                  {idea.name}
                </motion.h2>
                <p className="text-gray-300 mb-1">{idea.pitch}</p>
                <p className="text-sm text-gray-500">
                  Skapad: {new Date(idea.created_at).toLocaleString()}
                </p>
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
            className="bg-teal-500 hover:bg-teal-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow"
          >
            ➕ Skapa nytt AI-paket
          </a>
          <a
            href="/chat"
            className="bg-indigo-500 hover:bg-indigo-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow"
          >
            💬 Öppna AI-chatten
          </a>
        </motion.div>
      </div>
    </div>
  );
}
