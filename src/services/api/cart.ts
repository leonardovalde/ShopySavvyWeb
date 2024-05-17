import { ProductCartType } from '@/types/Products';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getCart(token: string) {
  const response = await fetch(`${backendUrl}/ShoppingCart/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const productByEan: any = await getProductByEan(token, [
    ...response.items.map((item: any) => item.productEan),
  ]);

  const productsByStore = new Map();
  response.items &&
    response.items.forEach((product: any) => {
      if (!productsByStore.has(product.storeName)) {
        productsByStore.set(product.storeName, []);
      }
      productsByStore.get(product.storeName).push({
        product: productByEan.find(
          (productd: any) => productd.ean === product.productEan,
        ),
        storeName: product.storeName,
        quantity: 1,
      });
    });
  console.log(productsByStore);

  const response2 = Array.from(productsByStore.keys()).map((storeName) => {
    return {
      totalPrice: productsByStore
        .get(storeName)
        .map((product: any) => Number(product.product.price))
        .reduce((a: number, b: number) => a + b, 0),
      storeName,
      products: productsByStore.get(storeName),
    };
  });
  return response2;
}

async function getProductByEan(token: string, eanList: string[]) {
  const response = await fetch(`${backendUrl}/Products/product_by_ean`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ products: eanList }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
}

export async function addToCart(token: string, product: ProductCartType) {
  console.log(product);
  const response = await fetch(`${backendUrl}/ShoppingCart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      itemId: product.product.productId,
      productEan: product.product.ean,
      quantity: product.quantity,
      price: product.product.price,
      storeName: product.storeName,
    }),
  });
}
