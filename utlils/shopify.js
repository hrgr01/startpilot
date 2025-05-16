// /utils/shopify.js
import { Shopify } from "@shopify/shopify-api";

const shopify = new Shopify({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  shopDomain: process.env.SHOPIFY_SHOP_DOMAIN,
  apiVersion: "2023-10"
});

export async function createShopifyStore(product) {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/api/2023-10/products.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN
        },
        body: JSON.stringify({
          product: {
            title: product,
            body_html: `<strong>${product}</strong> skapad av AI via Startpilot`,
            vendor: "Startpilot AI",
            product_type: "AI-generator"
          }
        })
      }
    );

    const data = await response.json();
    if (data?.product?.admin_graphql_api_id) {
      return {
        success: true,
        url: `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/products/${data.product.id}`
      };
    } else {
      console.error("Fel från Shopify:", data);
      return { success: false };
    }
  } catch (err) {
    console.error("Fel vid skapande av produkt:", err);
    return { success: false };
  }
}
