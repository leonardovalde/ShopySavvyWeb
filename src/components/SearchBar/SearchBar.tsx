'use client';
import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { useDebounce } from 'use-debounce';
import { GetProductByName } from '@/services/api/products';
import { useSession } from 'next-auth/react';
import ProductSelector from '../ProductSelector/ProductSelector';
import { ProductCartType, ProductType } from '@/types/Products';
import { toast } from 'react-toastify';
import { addItemToCart } from '@/helpers/cartHelper';

function SearchBar() {
  const [searchList, setSearchList] = useState([]);
  const [productSelected, setProductSelected] = useState<ProductType | null>(
    null,
  );
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 400);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchSearch() {
      const response = await GetProductByName(
        session?.user.accessToken as string,
        value,
      );
      setSearchList(response.items);
    }
    if (value) {
      fetchSearch();
    }
  }, [value]);

  return (
    <div className={styles.searchBarContainer}>
      {productSelected !== null && (
        <section className={styles.selectorContainer}>
          <ProductSelector
            product={productSelected}
            onAdd={(newProduct: ProductCartType) => {
              addItemToCart(newProduct);
              toast.success(`${productSelected.name} added to cart `);
              setProductSelected(null);
            }}
            onClose={() => setProductSelected(null)}
          />
        </section>
      )}
      <input
        onChange={(event) => setSearch(event.target.value)}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 100)}
        className="searchBar"
        placeholder="Arroz, Papel Higienico, Cafe, Coca Cola..."
      />
      {searchList.length > 0 && showList && (
        <section className={styles.searchListContainer}>
          {search !== '' &&
            searchList.map((product: any, i: number) => (
              <div
                className={styles.searchItem}
                key={i}
                onClick={() => {
                  setProductSelected(product);
                  console.log(product);
                }}>
                <section>
                  <img src={product.photosurl} />
                  <h1>{product.name}</h1>
                </section>
                <h4>
                  $
                  {product.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </h4>
              </div>
            ))}
        </section>
      )}
    </div>
  );
}

export default SearchBar;
