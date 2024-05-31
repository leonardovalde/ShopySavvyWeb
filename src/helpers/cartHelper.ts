import { getCart } from '@/services/api/cart';
import { ProductCartType } from '@/types/Products';

export function GetCart() {
  // const newCart = await getCart(session?.user.accessToken as string);
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

export function getProductsFromCart(
  products: any[],
  productToDelete: ProductCartType,
) {
  const returnProducts = products.map((product) => {
    if (product.storeName === productToDelete.storeName) {
      const newProducts = product.products.filter(
        (item: any) => item.itemId !== productToDelete.itemId,
      );
      const newTotal = newProducts.reduce((total: number, item: any) => {
        const price = parseInt(item.product.price, 10);
        return total + price * item.quantity;
      }, 0);

      return {
        ...product,
        totalPrice: newTotal,
        products: newProducts,
      };
    } else {
      return product;
    }
  });
  return returnProducts || [];
}

export function removeItemFromCart(product: ProductCartType) {
  const cart = GetCart() as any;
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
