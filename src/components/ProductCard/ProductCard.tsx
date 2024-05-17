import { ProductCartType, ProductType } from '@/types/Products';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import ProductSelector from '../ProductSelector/ProductSelector';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
/* cSpell:disable */

function ProductCard({
  product,
  onAdd,
  onRemoveFavorite,
}: {
  product: ProductType;
  onAdd: (newProduct: ProductCartType) => void;
  onRemoveFavorite?: (product: ProductType) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleOnAdd = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <section className={styles.selectorContainer}>
          <ProductSelector
            product={product}
            onClose={() => setShowModal(false)}
            onAdd={(newProduct: ProductCartType) => {
              console.log(newProduct);
              onAdd(newProduct);
              setShowModal(false);
            }}
            onRemoveFavorite={onRemoveFavorite}
          />
        </section>
      )}
      <div className={styles.container}>
        <section className={styles.iconContainer} onClick={handleOnAdd}>
          <Icon icon="material-symbols-light:add-shopping-cart" width={30} />
        </section>
        <img src={product.photosUrl} />
        <section className={styles.infoContainer}>
          <section>
            <p className={styles.price}>
              $
              {product.price
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </p>
            <p className={styles.name}>{product.name}</p>
          </section>
          <section className={styles.storesContainer}>
            {product.storeName.split(',').includes('tiendas_d1') && (
              <img src="/svg/D1.svg" />
            )}
            {product.storeName.split(',').includes('exito') && (
              <img src="/svg/exito.png" />
            )}
            {product.storeName.split(',').includes('colsubsidio') && (
              <img src="/svg/Colsubsidio.png" />
            )}
            {product.storeName.split(',').includes('olimpica') && (
              <img src="/svg/Olimpica.png" />
            )}
            {product.storeName.split(',').includes('jumbo') && (
              <img src="/svg/Jumbo.png" />
            )}
            {product.storeName.split(',').includes('carulla') && (
              <img src="/svg/Carulla.png" />
            )}
            {product.storeName.split(',').includes('makro') && (
              <img src="/svg/makro.png" />
            )}
            {product.storeName.split(',').includes('metro') && (
              <img src="/svg/Metro.png" />
            )}
          </section>
        </section>
      </div>
    </>
  );
}

export default ProductCard;
