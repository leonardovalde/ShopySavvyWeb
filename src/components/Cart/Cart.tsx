'use client';
import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import {
  CleanCart,
  getProductsFromCart,
  removeItemFromCart,
} from '@/helpers/cartHelper';
import { CartProductsType, ProductCartType } from '@/types/Products';
import { getStoreImageByName } from '@/helpers/ProductsHelper';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart, getCart, removeCartItem } from '@/services/api/cart';
import { useSession } from 'next-auth/react';

function Cart({ onClose }: { onClose: () => void }) {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const handleOnDelete = (product: ProductCartType) => {
    removeCartItem(product.itemId || 0, session?.user.accessToken || '');
    toast.info(`${product.product.name} removed from cart`);
    setProducts(getProductsFromCart(products, product) as any);
    console.log('deleted', product);
  };
  const handleCleanCart = () => {
    clearCart(session?.user.accessToken || '');
    setProducts([]);
    toast.info(`Cart cleaned`);
  };
  async function getProducts() {
    const newProducts: any = await getCart(session?.user.accessToken || '');
    setProducts(newProducts);
  }
  useEffect(() => {
    status === 'authenticated' && getProducts();
  }, []);

  return (
    <>
      <div className={styles.blankContainer} onClick={onClose}></div>
      <div className={styles.container}>
        <section className={styles.cartContainer} style={{ width: '100%' }}>
          <h4>Your Cart</h4>
          <section className={styles.storesContainer}>
            {products.length > 0 ? (
              products.map((product: CartProductsType) => (
                <div className={styles.storeContainer} key={product.storeName}>
                  <section className={styles.storeHeader}>
                    <img src={getStoreImageByName(product.storeName)} />
                    <p>{product.storeName}</p>
                  </section>
                  <section className={styles.productsContainer}>
                    {product.products.map((product: ProductCartType, index) => (
                      <Product
                        key={index}
                        product={product}
                        onDelete={() => handleOnDelete(product)}
                      />
                    ))}
                    <section className={styles.totalContainer}>
                      <p className={styles.totalLabel}>Total</p>
                      <p>
                        $
                        {product.totalPrice
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </p>
                    </section>
                  </section>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
            {products.length > 0 && (
              <button
                className={styles.cleanCartButton}
                onClick={handleCleanCart}>
                Clean Cart
              </button>
            )}
          </section>
        </section>
      </div>
    </>
  );
}

function Product({
  product,
  onDelete,
}: {
  product: ProductCartType;
  onDelete: () => void;
}) {
  return (
    <div className={styles.productContainer}>
      <section className={styles.productDescription}>
        <p>{product.quantity}</p>
        <img src={product.product.photosUrl} />
        <p className={styles.productName}>{product.product.name}</p>
      </section>
      <section className={styles.productPriceContainer}>
        <p className={styles.productPrice}>
          $
          {(Number(product.product.price) * product.quantity)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </p>
        <Icon
          className={styles.deleteIcon}
          icon="material-symbols-light:delete-forever-outline"
          onClick={onDelete}
          height={23}
        />
      </section>
    </div>
  );
}
export default Cart;
