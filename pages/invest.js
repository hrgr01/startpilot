export default function Invest() {
  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Investera i Startpilot 🚀</h1>
      <p className="mb-6">Vi bygger framtidens AI-plattform för entreprenörer. Vill du vara med på resan?</p>
      <form
        action="https://formspree.io/f/mgejgvjn"
        method="POST"
        className="space-y-4 text-left"
      >
        <input type="text" name="name" placeholder="Ditt namn" required className="w-full border p-2" />
        <input type="email" name="email" placeholder="Din e-post" required className="w-full border p-2" />
        <textarea name="message" placeholder="Varför vill du investera?" className="w-full border p-2 h-24" />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Skicka intresse</button>
      </form>
      <p className="mt-6 text-sm">
        📄 <a className="underline text-blue-600" href="/investor_pdf.pdf" target="_blank">Läs vår investerarpresentation (PDF)</a>
      </p>
    </div>
  );
}
