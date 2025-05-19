import { shopifyApi, LATEST_API_VERSION, RestClient } from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  hostName: process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, ""),
  adminApiAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

export async function createShopifyProduct(productData) {
  try {
    const client = new RestClient(process.env.SHOPIFY_STORE_DOMAIN, process.env.SHOPIFY_ACCESS_TOKEN);

    const response = await client.post({
      path: 'products',
      data: { product: productData },
      type: 'application/json',
    });

    return response.body.product;
  } catch (error) {
    console.error("Fel i createShopifyProduct:", error);
    throw error;
  }
}
