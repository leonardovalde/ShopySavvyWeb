export interface ProductType {
  productId: number;
  name: string;
  price: string;
  photosUrl: string;
  unit: string;
  subunit: string;
  subqty: string;
  description: string;
  sku: string;
  ean: string;
  brand: string;
  category: string;
  storeName: string;
  additionalPrices: {
    price: string;
    storeId: string;
  }[];
}

export interface ProductCartType {
  itemId?: number;
  productId: number;
  product: ProductType;
  storeName: string;
  quantity: number;
}
export interface CartProductsType {
  storeName: string;
  totalPrice: number;
  products: ProductCartType[];
}
