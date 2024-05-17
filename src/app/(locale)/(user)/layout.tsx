'use client';
import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import Sidebar from '@/components/Sidebar/Sidebar';
import Cart from '@/components/Cart/Cart';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function layout({ children }: { children: React.ReactNode }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    status === 'unauthenticated' && router.push('/login');
  }, [status]);
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <section className={styles.title}>
          <Icon
            className={styles.menuIcon}
            icon="material-symbols-light:menu-rounded"
            color="#9e9e9e"
            onClick={() => setSideBarOpen(true)}
          />
          <h1 className={styles.appName} onClick={() => router.push('/home')}>
            SHOP<span>SAVVY</span>
          </h1>
        </section>
        <section className={styles.searchBarContainer}>
          <SearchBar />
        </section>
        <section className={styles.cartContainer}>
          <Icon
            className={styles.menuIcon}
            icon="material-symbols-light:shopping-cart-outline"
            color="#9e9e9e"
            onClick={() => setCartOpen(!cartOpen)}
          />
        </section>
      </div>
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
      {sideBarOpen && (
        <>
          <div
            className={styles.sideBarContainer}
            onClick={() => setSideBarOpen(false)}></div>
          <div className={styles.sideBar}>
            {/* <span onClick={() => setSideBarOpen(false)}>x</span> */}
            <Sidebar onClose={() => setSideBarOpen(false)} />
          </div>
        </>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default layout;
