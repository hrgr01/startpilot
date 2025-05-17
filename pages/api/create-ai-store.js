// /pages/api/create-ai-store.js
import { createShopifyProduct } from "../../utils/shopify";

export default async function handler(req, res) {
  const { idea, email } = req.body;

  if (!idea || !email) {
    return res.status(400).json({ error: "Idé eller e-post saknas." });
  }

  try {
    const product = {
      title: idea,
      body_html: `<strong>${idea}</strong> – En AI-genererad produktbeskrivning.`,
      vendor: "Startpilot AI",
      product_type: "AI-produkt",
      tags: ["AI", "startup", "idé"]
    };

    const result = await createShopifyProduct(product);

    if (result?.admin_graphql_api_id) {
      const productLink = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/products/${result.id}`;

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productLink, idea })
      });

      return res.status(200).json({ productLink });
    } else {
      return res.status(500).json({ error: "Misslyckades att skapa produkt" });
    }
  } catch (error) {
    console.error("Fel vid produktskapande:", error);
    return res.status(500).json({ error: "Serverfel" });
  }
}
