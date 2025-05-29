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
    <div className="min-h-screen bg-[#0f172a] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">📊 Din AI-dashboard</h1>

        {loading ? (
          <p className="text-gray-400 animate-pulse">🔄 Laddar dina AI-idéer...</p>
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
                className="bg-[#1e293b] p-6 rounded-xl shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-2">{idea.name}</h2>
                <p className="text-gray-300 mb-1">{idea.pitch}</p>
                <p className="text-sm text-gray-500">
                  Skapad: {new Date(idea.created_at).toLocaleString()}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-400">❗ Du har ännu inga sparade AI-paket.</p>
        )}

        <div className="mt-8">
          <a
            href="/#form"
            className="bg-teal-500 hover:bg-teal-600 transition text-white px-6 py-3 rounded-xl font-semibold"
          >
            ➕ Skapa nytt AI-paket
          </a>
        </div>
      </div>
    </div>
  );
}
