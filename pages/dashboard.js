// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Lightbulb, Calendar, Sparkles, BrainCircuit, User, LineChart, Bot } from "lucide-react";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(i18n.language || 'en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ideaLimit = 5;
  const progress = Math.min((ideas.length / ideaLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-transparent to-[#0f172a] blur-3xl opacity-30 z-0"></div>
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-xl z-10 relative max-w-5xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <motion.h1 className="text-4xl font-bold">📊 {t('dashboard.title')}</motion.h1>
          {user && (
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <User className="w-5 h-5" />
              <span>{user.email}</span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 p-4 bg-white/10 border border-white/10 rounded-xl text-center text-gray-300 text-sm"
        >
          {t('dashboard.intro') || "Välkommen! Här kan du se dina idéer, klicka för att öppna dem, skapa nya eller prata med vår AI-coach."}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <LineChart className="w-4 h-4" /> Framsteg
          </h2>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-teal-500 h-4"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{ideas.length} av {ideaLimit} idéer skapade denna vecka</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-center gap-4"
        >
          <Bot className="w-8 h-8 text-indigo-300" />
          <div className="text-sm text-indigo-200">
            <strong>Tips:</strong> Klicka på 💬 knappen nedan för att chatta med vår AI och få hjälp att utveckla dina idéer!
          </div>
        </motion.div>

        {/* Här fortsätter resten av befintliga komponenter */}
      </div>
    </div>
  );
}
