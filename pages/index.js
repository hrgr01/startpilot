import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState({ name: '', interest: '', audience: '', experience: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Startpilot 🚀</h1>
      <p className="mb-6 text-lg">Få en AI-genererad affärsidé & pitch på 30 sekunder</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Ditt namn" onChange={e => setInput({ ...input, name: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Vad är du intresserad av?" onChange={e => setInput({ ...input, interest: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Målgrupp?" onChange={e => setInput({ ...input, audience: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Erfarenhet (kort)" onChange={e => setInput({ ...input, experience: e.target.value })} />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Generera idé</button>
      </form>

      {result && (
        <div className="mt-8 text-left">
          <h2 className="text-2xl font-bold mb-2">Din affärsidé:</h2>
          <p><strong>Idé:</strong> {result.idea}</p>
          <p><strong>Produkt:</strong> {result.product}</p>
          <p><strong>Pitch:</strong> {result.pitch}</p>
          <p><strong>Annonsidéer:</strong> {result.ads}</p>
        </div>
      )}
    </div>
  );
}
