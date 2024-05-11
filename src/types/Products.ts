export interface ProductType {
  productId: number;
  name: string;
  price: string;
  photosurl: string;
  unit: string;
  subunit: string;
  subqty: string;
  description: string;
  sku: string;
  ean: string;
  brand: string;
  category: string;
  storeName: string;
}
export interface ProductCartType {
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
