import { useState } from "react";

export default function Referral() {
  const [refId, setRefId] = useState("your-unique-code");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("https://startpilot.org/?ref=" + refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">💸 Referralprogram</h1>
      <p className="mb-2">Dela din personliga länk och få belöningar:</p>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <code>https://startpilot.org/?ref={refId}</code>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={copy}>
        {copied ? "Kopierat!" : "Kopiera länk"}
      </button>

      <div className="mt-8 text-left">
        <h2 className="font-semibold mb-2">🎁 Belöningar:</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>3 värvningar = 1 månad gratis</li>
          <li>5 värvningar = Creator-upplåsning</li>
          <li>10 värvningar = “Founder badge” + shoutout</li>
        </ul>
      </div>
    </div>
  );
}
