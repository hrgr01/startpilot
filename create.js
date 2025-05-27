// /pages/create.js
import { useState } from "react";
import { motion } from "framer-motion";

export default function CreateStore() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/create-shopify-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: { name, description } })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Create store error:", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10"
        >
          🛒 Skapa din Shopify-butik automatiskt
        </motion.h1>

        <input
          className="w-full p-3 mb-4 text-black rounded"
          placeholder="Produktnamn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full p-3 mb-4 text-black rounded"
          placeholder="Produktbeskrivning"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black font-semibold px-6 py-2 rounded hover:scale-105 transition"
        >
          {loading ? "Skapar butik..." : "Skapa Shopify-butik"}
        </button>

        {result?.success && (
          <p className="text-green-400 mt-6">
            ✅ Produkten skapad! Produkt-ID: {result.productId}
          </p>
        )}
        {result?.error && (
          <p className="text-red-400 mt-6">❌ Fel: {result.error}</p>
        )}
      </div>
    </main>
  );
}
