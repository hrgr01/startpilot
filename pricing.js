// /pages/pricing.js
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Gratis",
    features: ["1 AI-idé", "Demo-pitch", "Ingen butik"],
    link: "https://buy.stripe.com/5kA005eGdffZfXGeUU",
    cta: "Börja gratis"
  },
  {
    name: "Pro",
    price: "299 kr/mån",
    features: ["AI-idé + pitchdeck", "Mailflöde", "Produkttext + FAQ"],
    link: "https://buy.stripe.com/14k6otgOl9VFbHqfZ0",
    cta: "Välj Pro"
  },
  {
    name: "Creator",
    price: "499 kr/mån",
    features: ["+ Annonser", "Videoidé", "Meta/TikTok copy"],
    link: "https://buy.stripe.com/5kAfZ38hPebVh1K3cf",
    cta: "Välj Creator"
  },
  {
    name: "Enterprise",
    price: "Från 999 kr",
    features: ["White-label", "Full Shopify-setup", "1:1 Coaching"],
    link: "mailto:info@startpilot.org",
    cta: "Kontakta oss"
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">Välj ditt paket</h1>
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border border-gray-700 bg-gray-900 p-6 rounded-xl text-center hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-lg font-semibold mb-4">{plan.price}</p>
            <ul className="mb-4 space-y-1">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <Link href={plan.link} legacyBehavior>
              <a target="_blank">
                <button className="bg-white text-black px-4 py-2 rounded w-full font-medium">
                  {plan.cta}
                </button>
              </a>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center text-gray-400 text-sm">
        * Alla betalningar hanteras säkert via Stripe.
      </div>
    </main>
  );
}
