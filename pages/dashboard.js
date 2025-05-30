// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Lightbulb,
  Calendar,
  Sparkles,
  BrainCircuit,
  User,
  LineChart,
  Bot,
  FileText,
  Trophy
} from "lucide-react";

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
  const aiScore = ideas.length > 0 ? Math.floor(75 + (ideas.length * 5) % 25) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          🚀 {t('dashboard.title')}
        </motion.div>

        {user && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-300" />
              <span className="text-gray-300 text-sm">{user.email}</span>
            </div>
            <div>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-gray-700 text-white rounded p-2 text-sm"
              >
                <option value="en">English</option>
                <option value="sv">Svenska</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 bg-white/10 p-4 rounded-xl text-center text-gray-300"
        >
          ✨ {t('dashboard.intro') || "Här är dina idéer. Klicka för att läsa mer, skapa nytt eller chatta med AI."}
        </motion.div>

        <div className="mb-10">
          <h2 className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <LineChart className="w-4 h-4" /> {t('dashboard.progress')}
          </h2>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-teal-500 h-4"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{ideas.length} / {ideaLimit} {t('dashboard.created_this_week')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <Lightbulb className="mx-auto text-yellow-400" />
            <p>{t('dashboard.total_ideas')}: {ideas.length}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <Sparkles className="mx-auto text-pink-400" />
            <p>{t('dashboard.latest')}: {ideas[0]?.name || '-'}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <Calendar className="mx-auto text-blue-400" />
            <p>{t('dashboard.last_created')}: {ideas[0] ? formatDate(ideas[0].created_at) : '-'}</p>
          </div>
          <div className="bg-white/10 text-center p-4 rounded-xl">
            <BrainCircuit className="mx-auto text-green-400" />
            <p>{t('dashboard.ai_score')}: {aiScore}%</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">
            {t('dashboard.loading')}
          </div>
        ) : ideas.length > 0 ? (
          <ul className="space-y-6">
            {ideas.map((idea) => (
              <li key={idea.id} className="bg-white/10 p-6 rounded-xl relative">
                <h2 className="text-xl font-bold text-white">{idea.name}</h2>
                <p className="text-gray-300 mt-2">
                  {showFull[idea.id] ? idea.pitch : `${idea.pitch.slice(0, 120)}...`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('dashboard.created')}: {formatDate(idea.created_at)}
                </p>
                <button
                  className="mt-2 text-sm text-teal-400 hover:underline"
                  onClick={() => toggleView(idea.id)}
                >
                  {showFull[idea.id] ? t('dashboard.less') : t('dashboard.more')}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">{t('dashboard.no_ideas')}</p>
        )}

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a href="/#form" className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-xl font-semibold text-white">
            ➕ {t('dashboard.new_package')}
          </a>
          <a href="/chat" className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold text-white">
            🤖 {t('dashboard.open_chat')}
          </a>
          <a href="/download" className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold text-white">
            🧾 {t('dashboard.export_pdf') || "Exportera PDF"}
          </a>
        </div>
      </div>
    </div>
  );
}
