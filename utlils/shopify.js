// /utils/shopify.js

export async function createShopifyStore(productName) {
  const product = {
    name: productName,
    description: `En AI-genererad produkt: ${productName}`,
    price: `${Math.floor(Math.random() * 500 + 100)} kr`,
    image: `https://source.unsplash.com/featured/?${encodeURIComponent(productName)}`
  };

  return {
    success: true,
    product,
    url: `https://shopify.com/demo/${encodeURIComponent(productName)}`
  };
}
