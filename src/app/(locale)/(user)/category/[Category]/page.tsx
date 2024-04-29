'use client'
import ProductCard from '@/components/ProductCard/ProductCard'
import { GetProductByCategory, GetProducts } from '@/services/api/products'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { ProductCartType, ProductType } from '@/types/Products'
import { ToastContainer, toast } from 'react-toastify'
import { addItemToCart } from '@/helpers/cartHelper'

function page({ params }: { params: { Category: string } }) {
    const { data: session } = useSession()
    const [products, setProducts] = useState<any[]>([])
    useEffect(() => {
        const getProducts = async () => {
            const newProducts: any[] = await params.Category === 'all_products' ? await GetProducts(session?.user.accessToken as string) : await GetProductByCategory(session?.user.accessToken as string, params.Category)
            setProducts(newProducts ? newProducts.sort(() => Math.random() - 0.5) : [])
        }
        getProducts()


    }, [session?.user.accessToken])
    function handleAdd({ product }: { product: string }): void {
        throw new Error('Function not implemented.')
    }
    const handleCartAdd = (product: ProductCartType): void => {
        addItemToCart(product)
        toast.success(`${product.product.name} added to cart `)
    }
    return (
        <div className={styles.container}>
            <ToastContainer />
            <h1>{params.Category.replaceAll('_', ' ')}</h1>
            <section className={styles.productsContainer}>
                {products.map((product, index) => (
                    <ProductCard product={product} key={index} onAdd={handleCartAdd} />
                ))}
            </section>
        </div>
    )
}

export default page