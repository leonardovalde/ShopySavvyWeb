'use client'
import React, { useState } from 'react'
import styles from './layout.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Sidebar from '@/components/Sidebar/Sidebar'
import Cart from '@/components/Cart/Cart'

function layout({ children }: { children: React.ReactNode }) {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <Icon icon="material-symbols-light:menu-rounded" fontSize={40} color="#9e9e9e" onClick={() => setSideBarOpen(true)} />
                <Icon icon="material-symbols-light:shopping-cart-outline" fontSize={40} color="#9e9e9e" onClick={() => setCartOpen(!cartOpen)} />
            </div>
            {cartOpen && <Cart />}
            {sideBarOpen && <>
                <div className={styles.sideBarContainer}>
                </div>
                <div className={styles.sideBar}>
                    {/* <span onClick={() => setSideBarOpen(false)}>x</span> */}
                    <Sidebar onClose={() => setSideBarOpen(false)} />
                </div></>}
            <div className={styles.body}>
                {children}
            </div>
        </div>
    )
}

export default layout