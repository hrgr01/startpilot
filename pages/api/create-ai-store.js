// /pages/api/create-ai-store.js
import { createShopifyProduct } from "../../utils/shopify";

export default async function handler(req, res) {
  const { idea, email, shopDomain, accessToken } = req.body;

  if (!idea || !email || !shopDomain || !accessToken) {
    return res.status(400).json({ error: "Idé, e-post, shopDomain och accessToken krävs." });
  }

  try {
    const product = {
      title: idea,
      body_html: `<strong>${idea}</strong> – En AI-genererad produktbeskrivning.",
      vendor: "Startpilot AI",
      product_type: "AI-produkt",
      tags: ["AI", "startup", "idé"]
    };

    const result = await createShopifyProduct(product, shopDomain, accessToken);

    if (result?.admin_graphql_api_id) {
      const productLink = `https://${shopDomain}/admin/products/${result.id}`;

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          productLink,
          idea,
          pitch: `Detta är en AI-genererad pitch för idén: ${idea}`,
          videoUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/videos/demo-${idea}.mp4`,
          adText: `🚀 Starta ${idea} med hjälp av AI! Klicka här.`
        })
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
