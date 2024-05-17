'use client';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { redirect, useRouter } from 'next/navigation';
import { CleanCart } from '@/helpers/cartHelper';
import { CleanFavorites } from '@/helpers/favHelper';

function Sidebar({ onClose }: { onClose: () => void }) {
  const session = useSession();
  const [image, setImage] = useState<string>('/images/user.jpeg');
  const router = useRouter();
  useEffect(() => {
    session &&
      session.data?.user?.image &&
      setImage(session.data?.user?.image as string);
  }, [session]);
  const handleLogout = async () => {
    CleanCart();
    CleanFavorites();
    signOut({ callbackUrl: '/login', redirect: true });
  };
  const handleRedirect = (page: string) => {
    router.push(page);
    onClose();
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <img className={styles.banner} src="/images/SidebarBanner.jpg" />
        <img className={styles.userImage} src={image} />
        <p className={styles.userName}>
          {session.data?.user.name || 'Anonymous'}
        </p>
      </section>
      <section className={styles.sideBarBody}>
        <span onClick={() => handleRedirect('/home')}>
          <Icon
            className={styles.optionIcon}
            icon="material-symbols-light:home-outline"
          />
          Home
        </span>
        <section className={styles.divider} />
        <span onClick={() => handleRedirect('/category')}>
          <Icon
            className={styles.optionIcon}
            icon="material-symbols-light:category-outline"
          />
          Categories
        </span>
        <section className={styles.divider} />
        <span onClick={() => handleRedirect('/favorites')}>
          <Icon
            className={styles.optionIcon}
            icon="material-symbols-light:favorite-outline"
          />
          Favorites
        </span>
      </section>
      <section className={styles.sideBarFooter}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <Icon icon="material-symbols-light:login-outline-sharp" />
          Sing out
        </button>
      </section>
    </div>
  );
}

export default Sidebar;
