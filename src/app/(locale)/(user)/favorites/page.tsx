'use client';
import ProductCard from '@/components/ProductCard/ProductCard';
import { GetProductByCategory, GetProducts } from '@/services/api/products';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { ProductCartType, ProductType } from '@/types/Products';
import { ToastContainer, toast } from 'react-toastify';
import { addItemToCart } from '@/helpers/cartHelper';
import { GetFavorites } from '@/helpers/favHelper';
import { addToCart } from '@/services/api/cart';

function page({ params }: { params: { Category: string } }) {
  const [showGetMore, setShowGetMore] = useState(true);
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const newProducts: any = GetFavorites();
      setProducts(newProducts);
    };
    session?.user.accessToken && getProducts();
  }, [session?.user.accessToken]);
  useEffect(() => {}, [products]);
  async function handleLoadMore() {
    const newProducts = await GetProductByCategory(
      session?.user.accessToken as string,
      params.Category,
      page + 1,
      limit,
    );
    setProducts(products.concat(newProducts.items && newProducts.items));
    newProducts.items.length < limit && setShowGetMore(false);
    setPage((prev) => prev + 1);
  }
  const handleCartAdd = (product: ProductCartType): void => {
    addItemToCart(product);
    addToCart(session?.user.accessToken as string, product);
    toast.success(`${product.product.name} added to cart `);
  };
  const handleRemoveFavorite = (product: ProductType): void => {
    const newProducts = products.filter(
      (item) => item.productId !== product.productId,
    );
    setProducts(newProducts);
  };
  return (
    <div className={styles.container}>
      <ToastContainer autoClose={1000} />
      <h1>
        <span>Favorites</span>
      </h1>
      <section className={styles.productsContainer}>
        {products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
            onAdd={handleCartAdd}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </section>
    </div>
  );
}

export default page;
