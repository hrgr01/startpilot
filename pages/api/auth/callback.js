// /pages/api/auth/callback.js
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["write_products"],
  hostName: process.env.SHOPIFY_HOST.replace(/^https?:\/\//, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export default async function handler(req, res) {
  try {
    const session = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    // Du kan spara accessToken och shop-domän här om du har databas
    console.log("✅ Installationen lyckades:", session);

    res.redirect(`/dashboard?shop=${session.shop}`);
  } catch (error) {
    console.error("❌ Callback-fel:", error);
    res.status(500).send("Autentisering misslyckades.");
  }
}
