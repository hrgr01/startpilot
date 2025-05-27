// pages/form.js
import { useState } from 'react';

export default function Form() {
  const [idea, setIdea] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idea, email })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (error) {
      console.error('Fel vid skick:', error);
      alert('Kunde inte skicka formuläret.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 bg-zinc-900 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center">🚀 Starta din AI-idé</h1>

        <div>
          <label className="block text-sm mb-1">Din affärsidé</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            required
            placeholder="Beskriv din idé..."
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 placeholder-zinc-500"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Din e-postadress</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="namn@email.se"
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 placeholder-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded-md font-semibold hover:bg-zinc-200 transition"
        >
          {loading ? 'Skickar...' : 'Starta gratis'}
        </button>

        {submitted && (
          <p className="text-green-400 text-center font-medium">
            ✅ Ditt AI-paket är på väg till din mail!
          </p>
        )}
      </form>
    </div>
  );
}
