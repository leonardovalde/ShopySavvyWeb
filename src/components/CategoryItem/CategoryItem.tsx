import React from 'react'
import styles from './CategoryItem.module.css'
import { useRouter } from 'next/navigation'

interface Props { category: string, id: number, image: string, onClick: () => void }
function CategoryItem({ category, id, image, onClick }: Props) {

    const router = useRouter();
    function handleClick() {
        router.push(`/category/${category}`)
    }

    return (
        <div className={styles.container} key={id} onClick={handleClick}>
            <img src={image} />
            <p>{category.replaceAll('-', ' ')}</p>
        </div>
    )
}

export default CategoryItem