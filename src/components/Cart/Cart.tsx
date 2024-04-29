'use client'
import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { json } from 'stream/consumers'
import { getProductsFromCart } from '@/helpers/cartHelper'
import { CartProductsType, ProductCartType } from '@/types/Products'
import { getStoreImageByName } from '@/helpers/ProductsHelper'
import { Economica } from 'next/font/google'

function Cart() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(getProductsFromCart() as any)

    }, [])

    return (
        <div className={styles.container}>
            <section className={styles.cartContainer}>
                <h4>Your Cart</h4>
                <section className={styles.storesContainer}>
                    {products.map((product: CartProductsType) => (
                        <div className={styles.storeContainer}>
                            <section className={styles.storeHeader}>
                                <img src={getStoreImageByName(product.storeName)} />
                                <p>{product.storeName}</p>
                            </section>
                            <section className={styles.productsContainer}>
                                {product.products.map((product: ProductCartType) => (
                                    <Product key={product.productId} product={product} />
                                ))}
                                <section className={styles.totalContainer}>
                                    <p className={styles.totalLabel}>Total</p>
                                    <p>$14,000</p>
                                </section>
                            </section>
                        </div>
                    ))}
                </section>
            </section>
        </div>
    )
}

function Product({ product }: { product: ProductCartType }) {
    return (
        <div className={styles.productContainer}>
            <section className={styles.productDescription}>
                <img src={product.product.photosurl} />
                <p className={styles.productName}>{product.product.name}</p>
            </section>
            <p className={styles.productPrice}>${product.product.price}</p>
        </div>
    )
}
export default Cart