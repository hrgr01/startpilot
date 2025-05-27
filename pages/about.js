// /pages/about.js
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Vad är Startpilot?
        </motion.h1>

        <p className="text-lg text-gray-300 mb-6">
          Startpilot är en AI-driven företagsfabrik. Vi hjälper dig – helt automatiskt – att:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Få en affärsidé anpassad efter dina intressen</li>
          <li>Skapa en färdig Shopify-butik (med copy, FAQ, annonser, e-post)</li>
          <li>Generera pitchdeck, investorpresentation och videoreklam</li>
          <li>Få nya produktidéer varje vecka</li>
          <li>Starta och sälja inom 24 timmar</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🚀 Varför vi är unika</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Allt skapas av AI – du behöver inte kunna teknik</li>
          <li>Du får butik + marknadsföring + produktförslag direkt</li>
          <li>Vi levererar färdigt – inte bara tips</li>
          <li>Det tar <strong>mindre än 1 dag</strong> att starta</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">🎯 Vem passar det för?</h2>
        <p className="text-gray-300">
          Alla som vill tjäna pengar på nätet, utan att börja från noll. Du kan vara student, entreprenör, TikTokare eller bara idérik. Vi gör jobbet – du fokuserar på din vision.
        </p>
      </div>
    </main>
  );
}
