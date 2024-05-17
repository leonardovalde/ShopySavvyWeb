'use client';
import ProductCard from '@/components/ProductCard/ProductCard';
import {
  GetProductByCategory,
  GetProductByName,
  GetProducts,
} from '@/services/api/products';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { ProductCartType, ProductType } from '@/types/Products';
import { ToastContainer, toast } from 'react-toastify';
import { addItemToCart } from '@/helpers/cartHelper';
import { addToCart } from '@/services/api/cart';

function page({ params }: { params: { Search: string } }) {
  const [showGetMore, setShowGetMore] = useState(true);
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const newProducts: any = await GetProductByName(
        session?.user.accessToken as string,
        params.Search,
        page,
        limit,
      );
      products.length === 0 &&
        setProducts(
          newProducts.items
            ? newProducts.items.sort(() => Math.random() - 0.5)
            : [],
        );
    };
    session?.user.accessToken && getProducts();
  }, [session?.user.accessToken]);
  async function handleLoadMore() {
    const newProducts = await GetProductByName(
      session?.user.accessToken as string,
      params.Search,
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
  return (
    <div className={styles.container}>
      <ToastContainer autoClose={1000} />
      <h1>
        Search: <span>{params.Search.replaceAll('_', ' ').toUpperCase()}</span>
      </h1>
      <section className={styles.productsContainer}>
        {products.map((product, index) => (
          <ProductCard product={product} key={index} onAdd={handleCartAdd} />
        ))}
      </section>
      {showGetMore && products.length > 0 && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default page;
