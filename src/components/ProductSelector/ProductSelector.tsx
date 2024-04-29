'use client'
import React, { useState } from 'react'
import styles from './ProductSelector.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ProductCartType, ProductType } from '@/types/Products'
import { getStoreImageByName } from '@/helpers/ProductsHelper'


function ProductSelector({ product, onClose, onAdd }: { product: ProductType, onClose: () => void, onAdd: (newProduct: ProductCartType) => void }) {
    const [SelectedStore, setSelectedStore] = useState<string | null>(null)
    const handleOnAdd = () => {
        const newProductToCart: ProductCartType = {
            productId: product.productId,
            product: product,
            storeName: SelectedStore as string,
            quantity: 1
        }
        onAdd(newProductToCart)
    }
    return (
        <div className={styles.container} >
            <section className={styles.selectorControllers} onClick={(e) => { onClose() }}>
                <button className={styles.closeButton} onClick={onClose}><Icon icon="material-symbols:close" fontSize={30} /></button>
            </section>
            <section className={styles.selectorBody} onClick={(e) => { onClose() }}>
                <div className={styles.selectorBodyContainer} onClick={(e) => { e.stopPropagation() }}>
                    <img className={styles.productImage} src={product.photosurl} />
                    <p className={styles.productName}>{product.name}</p>
                    <section className={styles.storesContainer}>
                        {product.storeName.split(',').map((store) => (
                            <StoreSelector key={store} store={store} storeImage={getStoreImageByName(store) as string} price={product.price}
                                onClick={() => setSelectedStore(store === SelectedStore ? null : store)} selectedStore={SelectedStore}
                            />
                        ))}
                    </section>
                    <section className={styles.buySection}>

                        <button className={SelectedStore === null ? styles.disabledBuyButton : styles.buyButton} disabled={SelectedStore === null} onClick={handleOnAdd}>
                            Add to Cart
                        </button>
                        <Icon className={styles.favoriteIcon} icon="material-symbols-light:favorite-outline" fontSize={40} />
                    </section>

                </div>
            </section>
        </div>
    )
}

function StoreSelector({ store, storeImage, price, onClick, selectedStore }: { store: string, storeImage: string, price: string, onClick: () => void, selectedStore: string | null }) {
    return (
        <div className={styles.storeContainer + ' ' + (selectedStore === store ? styles.selectedStoreStyles : '')} onClick={onClick}>
            <img src={storeImage} />
            <p>${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
        </div >
    )
}

export default ProductSelector