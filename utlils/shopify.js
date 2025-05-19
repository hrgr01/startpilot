// utils/shopify.js
import { shopifyApi, LATEST_API_VERSION, RestClient } from "@shopify/shopify-api";

export async function createShopifyProduct(productData) {
  const client = new RestClient(process.env.SHOPIFY_STORE_DOMAIN, process.env.SHOPIFY_ACCESS_TOKEN);

  const response = await client.post({
    path: 'products',
    data: { product: productData },
    type: 'application/json',
  });

  return response.body.product;
}
