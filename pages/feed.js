// /pages/feed.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProductFeed() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product-feed")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          ✨ Upptäck nya AI-genererade produkter
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-400">Hämtar veckans produktidéer...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 p-6 rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                <h2 className="text-xl font-bold mb-2">{item["Produktnamn"]}</h2>
                <p className="text-gray-300 mb-2">{item["Kort beskrivning"]}</p>
                <p className="text-sm text-gray-400 mb-1">🎯 Målgrupp: {item["Målgrupp"]}</p>
                <p className="text-sm text-gray-400 mb-1">💡 Fördelar: {item["Säljfördelar"]}</p>
                <p className="text-sm text-green-400">📢 Annons-hook: {item["Rekommenderad annons-hook"]}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
