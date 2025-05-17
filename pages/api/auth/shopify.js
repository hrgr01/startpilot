// /pages/api/auth/shopify.js
import { shopifyApi } from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["write_products", "read_products"],
  hostName: process.env.SHOPIFY_APP_URL.replace(/^https:\/\//, ""),
  isEmbeddedApp: false,
  apiVersion: "2023-07",
});

export default async function handler(req, res) {
  try {
    const authRoute = await shopify.auth.begin({
      shop: req.query.shop,
      callbackPath: "/api/auth/callback",
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
  } catch (error) {
    console.error("OAuth init error:", error);
    res.status(500).send("OAuth failed");
  }
}
