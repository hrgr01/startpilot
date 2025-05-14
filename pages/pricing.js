export default function Pricing() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Välj ditt paket</h1>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            name: "Starter",
            price: "Gratis",
            features: ["1 AI-idé", "Demo pitch", "Inga annonser"],
            cta: "Börja gratis",
          },
          {
            name: "Pro",
            price: "299 kr/mån",
            features: ["AI-idé + pitch", "1 pitchdeck", "Mailflöde"],
            cta: "Välj Pro",
          },
          {
            name: "Creator",
            price: "499 kr/mån",
            features: ["+ annonser", "TikTok copy", "Videoidéer"],
            cta: "Välj Creator",
          },
          {
            name: "Enterprise",
            price: "Från 999 kr",
            features: ["White-label", "Anpassad lösning", "Coach ingår"],
            cta: "Kontakta oss",
          },
        ].map((pkg) => (
          <div key={pkg.name} className="border rounded-xl p-6 shadow-sm hover:shadow-md">
            <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
            <p className="text-lg font-semibold mb-4">{pkg.price}</p>
            <ul className="mb-4 space-y-1">
              {pkg.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button className="bg-black text-white px-4 py-2 rounded">{pkg.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
