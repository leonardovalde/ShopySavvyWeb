import { ProductCartType } from '@/types/Products';
import exp from 'constants';

export function GetCart() {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}
export function SetCart(cart: any) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function CleanCart() {
  localStorage.setItem('cart', '[]');
}
export function addItemToCart(product: ProductCartType) {
  const cart = GetCart();
  cart.push(product);
  SetCart(cart);
}

export function getProductsFromCart() {
  const cart = GetCart();
  const productsByStore = new Map();
  cart.forEach((product: ProductCartType) => {
    if (!productsByStore.has(product.storeName)) {
      productsByStore.set(product.storeName, []);
    }
    productsByStore.get(product.storeName).push(product);
  });
  const products = Array.from(productsByStore.keys()).map((storeName) => {
    return {
      totalPrice: productsByStore
        .get(storeName)
        .map((product: ProductCartType) => Number(product.product.price))
        .reduce((a: number, b: number) => a + b, 0),
      storeName,
      products: productsByStore.get(storeName),
    };
  });
  return products;
}

export function removeItemFromCart(product: ProductCartType) {
  const cart = GetCart();
  cart.forEach((item: ProductCartType, index: number) => {
    if (
      item.productId === product.productId &&
      item.storeName === product.storeName
    ) {
      cart.splice(index, 1);
      SetCart(cart);
    }
  });
}
