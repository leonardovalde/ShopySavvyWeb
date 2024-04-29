'use client'
import CategoryItem from '@/components/CategoryItem/CategoryItem'
import { GetProducts } from '@/services/api/products'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/ProductCard'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { ProductCartType, ProductType } from '@/types/Products'
import { addItemToCart } from '@/helpers/cartHelper'


function page() {
    const [products, setProducts] = useState<any[]>()
    const [categories, setCategories] = useState<{ category: string, id: number, image: string }[]>()
    const { data: session, status } = useSession()
    const router = useRouter()
    const containerRef = useRef<null | HTMLDivElement>();
    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -750,
                behavior: 'smooth',
            });
        }
    };
    const handleCartAdd = (product: ProductCartType): void => {
        addItemToCart(product)
        toast.success(`${product.product.name} added to cart `)
    }

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 750,
                behavior: 'smooth',
            });
        }
    };
    useEffect(() => {
        const getProducts = async () => {
            const newProducts = await GetProducts(session?.user.accessToken as string)
            setProducts(newProducts)
            const newCategories: { category: string; id: number; image: string }[] = [];
            newProducts.forEach((product: any) => {
                if (!newCategories.find((category) => category.category === product.category)) {
                    newCategories.push({
                        category: product.category,
                        id: newCategories.length + 1,
                        image: product.photosurl,
                    });
                }
            });
            setCategories(newCategories);
        }
        getProducts()
    }, [session?.user.accessToken])
    function handleAdd({ product }: { product: string }): void {
        toast.success(`${product} added to cart`)
    }

    function handleViewAllClick(): void {
        router.push('/category/all_products')
    }

    return (
        <div>
            <ToastContainer />
            <section className={styles.categoriesContainer}>
                <h4>Categories</h4>
                <section className={styles.categories}>
                    {categories && categories?.length > 0 && categories.map((category, index) => (
                        <CategoryItem id={category.id} category={category.category} image={category.image} key={index} onClick={() => {
                        }} />
                    ))}
                </section>
            </section>
            {products && products?.length > 0 &&
                <div className={styles.listDetails}>
                    <h4>Products</h4>
                    <section className={styles.controls}>
                        <p onClick={handleViewAllClick}>View all</p>
                        <button onClick={scrollLeft}><Icon icon="material-symbols:chevron-left-rounded" fontSize={30} /></button>
                        <button onClick={scrollRight}><Icon icon="material-symbols:chevron-right-rounded" fontSize={30} /></button>
                    </section>
                </div>}
            <section className={styles.productsContainer} ref={containerRef as any}>
                {products && products?.length > 0 && products.map((product, index) => {
                    return index < 30 && (
                        <ProductCard product={product} key={index} onAdd={handleCartAdd} />
                    )
                }
                )}
            </section>
        </div>
    )
}

export default page