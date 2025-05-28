// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogList } from '@/components/LogList';

export default function Home() {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <>
      <Head>
        <title>Startpilot – AI Business Builder</title>
        <meta name="description" content="Starta ditt företag på 24h med AI" />
      </Head>
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <section className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Din AI-coach för att starta företag på 24 timmar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Startpilot hjälper dig från idé till lansering – utan kod, stress eller startkapital.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button className="bg-white text-black px-6 py-3 text-lg rounded-full shadow-xl">
              Starta gratis
            </Button>
          </motion.div>
        </section>

        <section className="mt-24 max-w-4xl mx-auto">
          <Card className="bg-white text-black p-6 rounded-2xl shadow-xl">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Vad gör Startpilot?</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  AI-genererar en affärsidé, namn, logotyp, pitch & e-post
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Automatiskt e-postutskick till dig med allt innehåll
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Inbyggd betalningsfunktion via Stripe för uppgraderingar
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 max-w-4xl mx-auto text-center">
          <Button onClick={() => setShowLogs(!showLogs)} className="mt-4">
            {showLogs ? 'Dölj händelselogg' : 'Visa händelselogg'}
          </Button>
          {showLogs && <LogList />}
        </section>
      </main>
    </>
  );
}
