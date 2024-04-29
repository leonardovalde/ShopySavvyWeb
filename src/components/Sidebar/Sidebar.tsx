import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { redirect } from 'next/navigation'

function Sidebar({ onClose }: { onClose: () => void }) {
    const session = useSession()
    const handleLogout = async () => {
        // await signOut()
        redirect('/login')
    }

    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <button className={styles.closeButton} onClick={onClose}><Icon icon="material-symbols:close" /></button>
            </section>
            <section className={styles.user}>
                {session.data?.user?.image && <Image className={styles.image} src={session.data?.user?.image} width={100} height={100} alt="logo" />}
                <p className={styles.userName}>{session.data?.user?.email}</p>
            </section>

            <a className={styles.logoutButton} href="/login" onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>
                Logout
            </a>
        </div>
    )
}

export default Sidebar