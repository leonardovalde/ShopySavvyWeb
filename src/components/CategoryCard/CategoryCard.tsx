import React from 'react';
import styles from './CategoryCard.module.css';
import { useRouter } from 'next/navigation';

function CategoryCard({ category }: { category: string }) {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/category/${category}`)}>
      <img src={`/svg/${category}.jpg`} />
      <p className={styles.name}>{category}</p>
    </div>
  );
}

export default CategoryCard;
