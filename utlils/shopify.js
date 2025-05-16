// /utils/shopify.js
import axios from "axios";

export async function createShopifyStore(productName) {
  try {
    const shopifyApiKey = process.env.SHOPIFY_API_KEY;
    const shopifyPassword = process.env.SHOPIFY_API_PASSWORD;
    const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;

    const productPayload = {
      product: {
        title: productName,
        body_html: `<strong>${productName}</strong> - Skapad av Startpilot AI`,
        vendor: "Startpilot",
        product_type: "AI-genererad produkt",
        tags: ["AI", "Startpilot", "Auto"]
      }
    };

    const response = await axios.post(
      `https://${shopifyDomain}/admin/api/2023-10/products.json`,
      productPayload,
      {
        auth: {
          username: shopifyApiKey,
          password: shopifyPassword
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const productId = response.data.product.id;
    return {
      success: true,
      url: `https://${shopifyDomain}/admin/products/${productId}`
    };
  } catch (error) {
    console.error("Shopify API error:", error.message);
    return { success: false, error: error.message };
  }
}
