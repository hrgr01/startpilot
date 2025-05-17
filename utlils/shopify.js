// /utils/shopify.js
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["write_products"],
  hostName: process.env.SHOPIFY_HOST.replace(/^https?:\/\//, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export async function createShopifyProduct(shop, accessToken, productData) {
  const client = new shopify.clients.Rest({ session: { shop, accessToken } });

  const product = await client.post({
    path: "products",
    data: { product: productData },
    type: "json",
  });

  return product?.body?.product;
}
