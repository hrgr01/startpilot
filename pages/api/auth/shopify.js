// utils/shopify.js

import '@shopify/shopify-api/adapters/node'; // 💥 NYCKELRAD – laddar rätt adapter
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  adminApiAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  scopes: ['write_products'],
  hostName: (process.env.SHOPIFY_STORE_DOMAIN || '').replace(/^https?:\/\//, ''),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false
});

export async function createShopifyProduct(product) {
  const client = new shopify.clients.Rest({
    session: {
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      shop: process.env.SHOPIFY_STORE_DOMAIN,
    }
  });

  const response = await client.post({
    path: 'products',
    data: { product },
    type: 'application/json',
  });

  return response.body.product;
}
