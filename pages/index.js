import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Section = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="my-16"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Section>
        <h1 className="text-4xl font-bold text-center mb-4">
          🚀 Startpilot: Starta din AI-butik på 24h
        </h1>
        <p className="text-center text-lg text-gray-600">
          AI-genererad affärsidé, butik, pitch, annonser och mer. Allt på autopilot.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-2">📦 Vad du får</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>AI-genererad affärsidé & produktnisch</li>
          <li>Färdig Shopify-butik på 1 timme</li>
          <li>Automatisk pitch deck & TikTok-annonsidéer</li>
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold mb-2">🎥 AI-video (demo)</h2>
        <video className="rounded-xl border" autoPlay muted loop controls width="100%">
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Section>

      <Section>
        <a href="/form">
          <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800">
            Starta gratis → Skicka in din idé
          </button>
        </a>
      </Section>
    </div>
  );
}
