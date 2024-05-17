'use client';
import React, { useState } from 'react';
import styles from './ProductSelector.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ProductCartType, ProductType } from '@/types/Products';
import { getStoreImageByName } from '@/helpers/ProductsHelper';
import { toast } from 'react-toastify';
import {
  addItemToFavorites,
  isInFavorites,
  removeItemFromCart,
} from '@/helpers/favHelper';

function ProductSelector({
  product,
  onClose,
  onAdd,
  onRemoveFavorite,
}: {
  product: ProductType;
  onClose: () => void;
  onAdd: (newProduct: ProductCartType) => void;
  onRemoveFavorite?: (product: ProductType) => void;
}) {
  const [SelectedStore, setSelectedStore] = useState<string | null>(null);
  const [favState, setFavState] = useState<boolean>(isInFavorites(product));
  const handleOnAdd = () => {
    const newProductToCart: ProductCartType = {
      productId: product.productId,
      product: {
        ...product,
        price:
          product.additionalPrices.find((p) => p.storeId === SelectedStore)
            ?.price || product.price,
      },
      storeName: SelectedStore as string,
      quantity: quantity,
    };
    onAdd(newProductToCart);
  };
  const handleOnFavorite = () => {
    toast.success('Favoritado');
    setFavState(!favState);
    addItemToFavorites(product);
  };
  const handleOffFavorite = () => {
    toast.success('Desfavoritado');
    setFavState(!favState);
    removeItemFromCart(product);
    onRemoveFavorite && onRemoveFavorite(product);
  };
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  return (
    <div className={styles.container}>
      <section
        className={styles.selectorControllers}
        onClick={(e) => {
          onClose();
        }}>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon icon="material-symbols:close" fontSize={30} />
        </button>
      </section>
      <section
        className={styles.selectorBody}
        onClick={(e) => {
          onClose();
        }}>
        <div
          className={styles.selectorBodyContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <img className={styles.productImage} src={product.photosUrl} />
          <p className={styles.productName}>{product.name}</p>
          <section className={styles.storesContainer}>
            {product.storeName.split(',').map((store) => (
              <StoreSelector
                key={store}
                store={store}
                storeImage={getStoreImageByName(store) as string}
                // price={product.price}
                price={
                  product.additionalPrices.find((p) => p.storeId === store)
                    ?.price || product.price
                }
                onClick={() =>
                  setSelectedStore(store === SelectedStore ? null : store)
                }
                selectedStore={SelectedStore}
              />
            ))}
          </section>
          <section className={styles.quantitySection}>
            <button className={styles.decreaseButton} onClick={handleDecrease}>
              -
            </button>
            <input
              className={styles.quantityInput}
              type="number"
              value={quantity}
              onChange={handleChange}
              min="1"
            />
            <button className={styles.increaseButton} onClick={handleIncrease}>
              +
            </button>
          </section>
          <section className={styles.buySection}>
            <button
              className={
                SelectedStore === null
                  ? styles.disabledBuyButton
                  : styles.buyButton
              }
              disabled={SelectedStore === null}
              onClick={handleOnAdd}>
              Add to Cart
            </button>
            {!favState ? (
              <Icon
                className={styles.favoriteIcon}
                icon="material-symbols-light:favorite-outline"
                fontSize={40}
                onClick={handleOnFavorite}
              />
            ) : (
              <Icon
                className={styles.favoriteIcon}
                icon="material-symbols-light:favorite"
                fontSize={40}
                onClick={handleOffFavorite}
              />
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

function StoreSelector({
  store,
  storeImage,
  price,
  onClick,
  selectedStore,
}: {
  store: string;
  storeImage: string;
  price: string;
  onClick: () => void;
  selectedStore: string | null;
}) {
  return (
    <div
      className={
        styles.storeContainer +
        ' ' +
        (selectedStore === store ? styles.selectedStoreStyles : '')
      }
      onClick={onClick}>
      <img src={storeImage} />
      <p>${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
    </div>
  );
}

export default ProductSelector;
