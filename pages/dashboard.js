// /pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import supabase from "../utils/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) router.push("/login");
      else {
        setUser(session.user);
        setLoading(false);
      }
    };
    getSession();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">🔐 Laddar dashboard...</p>;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          🧠 Välkommen {user.email} till din Startpilot Dashboard
        </motion.h1>

        {/* Resten av din dashboard här, t.ex. affärsidé, knappar etc. */}
        {/* ... */}
      </div>
    </main>
  );
}
