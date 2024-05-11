import { ProductCartType, ProductType } from '@/types/Products';
import exp from 'constants';

export function GetFavorites() {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(favorites);
  } else {
    return [];
  }
}
export function SetFavorites(favorites: any) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
export function CleanFavorites() {
  localStorage.setItem('favorites', '[]');
}
export function addItemToFavorites(product: ProductType) {
  const favorites = GetFavorites();
  favorites.push(product);
  SetFavorites(favorites);
}

export function removeItemFromCart(product: ProductType) {
  const favorites = GetFavorites();
  favorites.forEach((item: ProductCartType, index: number) => {
    if (item.productId === product.productId) {
      favorites.splice(index, 1);
      SetFavorites(favorites);
    }
  });
}

export function removeItemFromFavorites(product: ProductType) {
  const favorites = GetFavorites();
  favorites.forEach((item: ProductType, index: number) => {
    if (item.productId === product.productId) {
      favorites.splice(index, 1);
      SetFavorites(favorites);
    }
  });
}

export function isInFavorites(product: ProductType) {
  const favorites = GetFavorites();
  return favorites.some(
    (item: ProductCartType) => item.productId === product.productId,
  );
}
