// /pages/api/create-shopify-store.js
import { Shopify } from "@shopify/shopify-api";

const shopify = new Shopify.Clients.Rest(process.env.SHOPIFY_SHOP, process.env.SHOPIFY_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { product } = req.body;

  try {
    const created = await shopify.post({
      path: "products",
      data: {
        product: {
          title: product.name,
          body_html: product.description,
          vendor: "Startpilot",
          product_type: "AI Produkt",
          tags: ["AI", "Auto-genererad"]
        }
      },
      type: Shopify.Clients.Rest.DataType.JSON
    });

    res.status(200).json({ success: true, productId: created.body.product.id });
  } catch (err) {
    console.error("Shopify error:", err);
    res.status(500).json({ error: "Kunde inte skapa produkt i Shopify." });
  }
}
