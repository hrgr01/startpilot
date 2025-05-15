import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Form() {
  const [idea, setIdea] = useState("");
  const [refBy, setRefBy] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ref = localStorage.getItem("ref");
    if (ref) setRefBy(ref);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("orders").insert([
      {
        idea,
        refBy,
      },
    ]);

    if (error) {
      console.error("Fel vid inskickning:", error.message);
      alert("Något gick fel – försök igen!");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">✅ Idén är inskickad!</h2>
        <p>Tack för ditt bidrag – vi återkommer via e-post.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">💡 Skicka in din AI-idé</h1>

      <textarea
        className="border p-3 w-full rounded mb-4"
        rows={4}
        placeholder="Ex: En AI som hjälper småföretagare med TikTok-annonser..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
      >
        Skicka in
      </button>
    </form>
  );
}
