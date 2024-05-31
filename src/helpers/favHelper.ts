import {
  AddFavoriteProduct,
  GetFavoriteProducts,
  RemoveFavoriteProduct,
} from '@/services/api/products';
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
export function addItemToFavorites(product: ProductType, token: string) {
  AddFavoriteProduct(token, product.ean);
}

export function removeItemFromFavorites(product: ProductType, token: string) {
  RemoveFavoriteProduct(token, product.ean);
  const favorites = GetFavorites();
  favorites.forEach((item: ProductType, index: number) => {
    if (item.productId === product.productId) {
      favorites.splice(index, 1);
      SetFavorites(favorites);
    }
  });
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

export async function isInFavorites(product: ProductType, token: string) {
  const favorites = await GetFavoriteProducts(token);
  console.log(
    favorites.find((item: any) => item.ean === product.ean) ? true : false,
  );

  return favorites.find((item: any) => item.ean === product.ean) ? true : false;
}
