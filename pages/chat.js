// pages/chat.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import Head from "next/head";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
    };

    fetchUser();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      const data = await res.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <Head>
        <title>AI-Chatt – Startpilot</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">💬 AI-Chatt</h1>

        <div className="bg-[#1e293b] rounded-xl p-6 h-[70vh] overflow-y-auto mb-6">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block px-4 py-2 rounded-xl ${msg.role === "user" ? "bg-teal-600" : "bg-gray-600"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <p className="text-center text-gray-400 animate-pulse">AI svarar...</p>}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-[#1e293b] border border-gray-600 focus:outline-none"
            placeholder="Ställ en fråga till din AI-coach..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-xl font-semibold"
          >
            Skicka
          </button>
        </form>
      </div>
    </div>
  );
}
