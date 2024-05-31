'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import { GetCategories } from '@/services/api/products';
import { useSession } from 'next-auth/react';

function page() {
  const [categories, setCategories] = useState<string[]>([]);
  const { data: session, status } = useSession();
  async function getCategories() {
    const newCategories = await GetCategories(
      session?.user.accessToken as string,
    ).then((data) => data.categories);
    setCategories(newCategories);
  }
  useEffect(() => {
    status === 'authenticated' && getCategories();
  }, [status]);
  return (
    <div className={styles.container}>
      <h1>Categories</h1>
      <section className={styles.productsContainer}>
        {categories &&
          categories.map((category) => (
            <CategoryCard key={category} category={category} />
          ))}
      </section>
    </div>
  );
}

export default page;
