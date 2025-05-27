// /pages/video.js
import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoGenerator() {
  const [pitch, setPitch] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch })
      });
      const data = await res.json();
      setResult(data.video);
    } catch (err) {
      console.error("Video API error:", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          🎬 AI Video Generator
        </motion.h1>

        <textarea
          className="w-full p-4 text-black rounded mb-4"
          rows={4}
          placeholder="Klistra in din affärspitch här..."
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
        />
        <button
          onClick={generateVideo}
          disabled={loading || !pitch}
          className="bg-white text-black px-6 py-2 rounded font-semibold hover:scale-105 transition"
        >
          {loading ? "Genererar videoidé..." : "Generera videoidé"}
        </button>

        {result && (
          <div className="mt-10 space-y-6">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">🎯 Hook</h2>
              <p>{result["Hook"]}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">🎙 Tonalitet</h2>
              <p>{result["Tonalitet"]}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">🎞 Sekvenser</h2>
              <p>{result["Videosekvenser"]}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">🗣 Röstspår</h2>
              <p>{result["Röstspår"]}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">📢 Call to Action</h2>
              <p>{result["Avslutning med call-to-action"]}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
