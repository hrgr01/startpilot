// /pages/login.js
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-[#1e293b] rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Logga in till Startpilot</h1>
        <input
          type="email"
          placeholder="din@email.com"
          className="w-full p-4 mb-4 bg-[#0f172a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-semibold"
        >
          Skicka magisk länk
        </button>
        {sent && <p className="mt-4 text-green-400">Länken är skickad! Kolla din e-post.</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </form>
    </div>
  );
}
