// /pages/api/create-ai-store.js
import { createShopifyProduct } from "@/utils/shopify";

export default async function handler(req, res) {
  const { idea, email, shop, accessToken } = req.body;

  if (!idea || !email || !shop || !accessToken) {
    return res.status(400).json({ error: "Saknar idé, e-post, shop eller token" });
  }

  try {
    const product = {
      title: idea,
      body_html: `<strong>${idea}</strong><br>En AI-genererad produktbeskrivning.`,
      vendor: "Startpilot AI",
      product_type: "AI-produkt",
      tags: ["AI", "startup", "idé"]
    };

    const result = await createShopifyProduct(shop, accessToken, product);

    if (result?.id) {
      const productLink = `https://${shop}/admin/products/${result.id}`;

      // Skicka mejl till kunden
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, idea, productLink })
      });

      return res.status(200).json({ productLink });
    } else {
      return res.status(500).json({ error: "Misslyckades att skapa produkt" });
    }
  } catch (err) {
    console.error("Fel i create-ai-store.js:", err);
    return res.status(500).json({ error: "Serverfel" });
  }
}
