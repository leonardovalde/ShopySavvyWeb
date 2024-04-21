'use client'
import React, { useState } from 'react'
import styles from './layout.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Sidebar from '@/components/Sidebar/Sidebar'

function layout({ children }: { children: React.ReactNode }) {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <Icon icon="ic:baseline-menu" fontSize={40} color="#9e9e9e" onClick={() => setSideBarOpen(true)} />
            </div>
            {sideBarOpen && <>
                <div className={styles.sideBarContainer}>
                </div>
                <div className={styles.sideBar}>
                    {/* <span onClick={() => setSideBarOpen(false)}>x</span> */}
                    <Sidebar onClose={() => setSideBarOpen(false)} />
                </div></>}
            {children}
        </div>
    )
}

export default layout