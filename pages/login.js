// /pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (!error) alert("Check your inbox for the login link!");
    else alert("Login error: " + error.message);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">🔐 Logga in till din dashboard</h1>
      <form onSubmit={handleLogin} className="max-w-md w-full bg-[#1e293b] p-8 rounded-xl shadow">
        <label className="block mb-4">
          <span className="text-sm font-medium">Din e-post</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-4 rounded-lg bg-[#0f172a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600 transition text-white font-semibold"
        >
          {loading ? "Skickar länk..." : "Logga in"}
        </button>
      </form>
    </div>
  );
}
