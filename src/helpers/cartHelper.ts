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
      storeName,
      products: productsByStore.get(storeName),
    };
  });
  return products;
}
