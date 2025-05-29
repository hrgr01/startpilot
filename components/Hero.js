// components/Hero.js
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/#form");
  };

  return (
    <section className="bg-[#0f172a] py-20 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          🚀 Starta ditt nästa företag med AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Skriv in din idé så bygger Startpilot ett komplett affärspaket på några sekunder. Allt skickas till din mejl – 100 % gratis.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg rounded-xl shadow-lg cursor-pointer"
          onClick={handleClick}
        >
          Kom igång nu
        </motion.div>
      </div>
    </section>
  );
}
